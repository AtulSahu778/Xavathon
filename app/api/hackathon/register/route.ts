import { NextResponse } from "next/server";

type Participant = {
  fullName?: string;
  email?: string;
  phone?: string;
  rollNumber?: string;
  department?: string;
};

type HackathonPayload = {
  teamName?: string;
  leaderName?: string;
  leaderEmail?: string;
  leaderPhone?: string;

  department?: string;
  semester?: string;
  teamSize?: number;
  participants?: Participant[];
  projectTitle?: string;
  problemStatement?: string;
  projectDescription?: string;
  whyParticipate?: string;
  participatedBefore?: boolean;
  terms?: boolean;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPhone10 = (value: string) => /^\d{10}$/.test(value);

function normalizePhone(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "").slice(0, 10);
}

function validatePayload(body: HackathonPayload): string | null {
  const requiredStrings: [keyof HackathonPayload, string][] = [
    ["teamName", "Team name is required"],
    ["leaderName", "Leader name is required"],
    ["leaderEmail", "Leader email is required"],
    ["leaderPhone", "Leader phone is required"],

    ["department", "Department is required"],
    ["semester", "Semester is required"],
    ["projectTitle", "Project title is required"],
    ["problemStatement", "Problem statement is required"],
    ["projectDescription", "Project description is required"],
    ["whyParticipate", "Please explain why you want to participate"],
  ];

  for (const [key, msg] of requiredStrings) {
    const v = body[key];
    if (typeof v !== "string" || !v.trim()) {
      return msg;
    }
  }

  if (!isValidEmail(body.leaderEmail ?? "")) {
    return "Invalid leader email";
  }
  if (!isValidPhone10(normalizePhone(body.leaderPhone))) {
    return "Leader phone must be exactly 10 digits";
  }

  const size = Number(body.teamSize);
  if (!Number.isFinite(size) || size < 1 || size > 5) {
    return "Team size must be between 1 and 5";
  }

  const participants = body.participants ?? [];
  if (participants.length < 1 || participants.length > 5) {
    return "Participants must be between 1 and 5";
  }

  if (participants.length !== size) {
    return "Team size must match participant count";
  }

  for (let i = 0; i < participants.length; i++) {
    const p = participants[i];
    if (!p?.fullName?.trim()) return `Participant ${i + 1}: full name is required`;
    if (!p?.email?.trim() || !isValidEmail(p.email)) return `Participant ${i + 1}: valid email is required`;
    if (!isValidPhone10(normalizePhone(p?.phone))) return `Participant ${i + 1}: phone must be 10 digits`;
    if (!p?.rollNumber?.trim()) return `Participant ${i + 1}: class roll no. is required`;
    if (!p?.department?.trim()) return `Participant ${i + 1}: department is required`;
  }

  if (!body.terms) {
    return "You must accept the terms";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HackathonPayload;

    const normalized: HackathonPayload = {
      ...body,
      leaderPhone: normalizePhone(body.leaderPhone),
      participants: (body.participants ?? []).map((p) => ({
        ...p,
        phone: normalizePhone(p?.phone),
        collegeName: "St. Xavier's College, Ranchi",
      })),
    };

    const err = validatePayload(normalized);
    if (err) {
      return NextResponse.json({ ok: false, message: err }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { ok: false, message: "GOOGLE_SHEETS_WEBHOOK_URL is not configured." },
        { status: 500 },
      );
    }

    const webhookSecret =
      process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? process.env.REGISTER_WEBHOOK_SECRET ?? "";
    const url = new URL(webhookUrl);
    if (webhookSecret && !url.searchParams.has("secret")) {
      url.searchParams.set("secret", webhookSecret);
    }

    const participantsJson = JSON.stringify(normalized.participants ?? []);

    const webhookBody = {
      submittedAt: new Date().toISOString(),
      formKind: "hackathon_v1",
      teamName: normalized.teamName,
      leaderName: normalized.leaderName,
      leaderEmail: normalized.leaderEmail,
      leaderPhone: normalized.leaderPhone,
      collegeName: "St. Xavier's College, Ranchi",
      department: normalized.department,
      semester: normalized.semester,
      teamSize: normalized.teamSize,
      participantsJson,
      projectTitle: normalized.projectTitle,
      problemStatement: normalized.problemStatement,
      projectDescription: normalized.projectDescription,
      whyParticipate: normalized.whyParticipate,
      participatedBefore: Boolean(normalized.participatedBefore),
      terms: Boolean(normalized.terms),
    };

    const webhookResponse = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "x-register-secret": webhookSecret } : {}),
      },
      body: JSON.stringify(webhookBody),
    });

    const webhookText = await webhookResponse.text();
    let webhookData: { ok?: boolean; message?: string } | null = null;
    try {
      webhookData = webhookText ? (JSON.parse(webhookText) as { ok?: boolean; message?: string }) : null;
    } catch {
      webhookData = null;
    }

    if (!webhookResponse.ok || (webhookData && webhookData.ok === false)) {
      return NextResponse.json(
        { ok: false, message: webhookData?.message || "Could not save registration." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: "Registration saved." });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }
}

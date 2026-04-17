import { NextResponse } from "next/server";

type RegistrationPayload = {
  teamName?: string;
  leaderName?: string;
  leaderEmail?: string;
  leaderCourse?: string;
  leaderRollNo?: string;
  leaderPhone?: string;
  leaderSemester?: string;
  teamMembersName?: string;
  teamMembersCourse?: string;
  teamMembersEmail?: string;
  teamMembersSemester?: string;
  teamMembersRollNo?: string;
  ideaTitle?: string;
  ideaSummary?: string;
  consent?: boolean;
  website?: string;
};

const requiredFields: (keyof RegistrationPayload)[] = [
  "teamName",
  "leaderName",
  "leaderEmail",
  "leaderCourse",
  "leaderRollNo",
  "leaderPhone",
  "leaderSemester",
  "teamMembersName",
  "teamMembersCourse",
  "teamMembersEmail",
  "teamMembersSemester",
  "teamMembersRollNo",
  "ideaTitle",
  "ideaSummary",
];

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPhone = (value: string) => /^\d{10}$/.test(value);

function validatePayload(payload: RegistrationPayload) {
  for (const field of requiredFields) {
    const value = payload[field];
    if (typeof value !== "string" || !value.trim()) {
      return `${field} is required`;
    }
  }

  if (!payload.consent) {
    return "consent is required";
  }
  if (!isValidEmail(payload.leaderEmail ?? "")) {
    return "Invalid leader email";
  }
  if (!isValidPhone(payload.leaderPhone ?? "")) {
    return "Invalid leader phone";
  }
  if ((payload.ideaSummary?.length ?? 0) > 1200) {
    return "Idea summary is too long";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RegistrationPayload;

    // Honeypot: silently reject bot-like submissions.
    if (payload.website && payload.website.trim()) {
      return NextResponse.json({ ok: true });
    }

    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ ok: false, message: validationError }, { status: 400 });
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
      // Apps Script can read query params in doPost(e). This keeps setup simple.
      url.searchParams.set("secret", webhookSecret);
    }

    const webhookResponse = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Header kept as fallback for custom webhook handlers.
        ...(webhookSecret ? { "x-register-secret": webhookSecret } : {}),
      },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
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
        {
          ok: false,
          message: webhookData?.message || "Could not save registration. Try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }
}

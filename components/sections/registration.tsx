"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const guidelines = [
  "Each team must consist of exactly 5 members (1 leader + 4 members)",
  "Only 11 teams will be shortlisted from the Computer Science Department",
  "Selection will be based on idea quality, clarity, and innovation",
  "Problem statements will be released on 27 April, after which teams must start building their solution",
  "Teams must demonstrate their working prototype on 28 April",
  "Final results will be announced on 29 April",
];

const readyChecklist = [
  "Leader and team member academic details",
  "Valid phone number and email addresses",
  "Project title and original description",
  "All names exactly as official records",
];

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]";
const labelClassName = "text-xs font-medium text-zinc-300";

type RegistrationForm = {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderCourse: string;
  leaderRollNo: string;
  leaderPhone: string;
  leaderSemester: string;
  teamMembersName: string;
  teamMembersCourse: string;
  teamMembersEmail: string;
  teamMembersSemester: string;
  teamMembersRollNo: string;
  ideaTitle: string;
  ideaSummary: string;
  consent: boolean;
  website?: string;
};

const initialForm: RegistrationForm = {
  teamName: "",
  leaderName: "",
  leaderEmail: "",
  leaderCourse: "",
  leaderRollNo: "",
  leaderPhone: "",
  leaderSemester: "",
  teamMembersName: "",
  teamMembersCourse: "",
  teamMembersEmail: "",
  teamMembersSemester: "",
  teamMembersRollNo: "",
  ideaTitle: "",
  ideaSummary: "",
  consent: false,
  website: "",
};

export function RegistrationSection() {
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const safeForm: RegistrationForm = { ...initialForm, ...form };

  const updateField = <K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) {
        return prev;
      }
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateClient = () => {
    const nextErrors: Partial<Record<keyof RegistrationForm, string>> = {};

    if (!form.teamName.trim()) nextErrors.teamName = "Team name is required.";
    if (!form.leaderName.trim()) nextErrors.leaderName = "Leader name is required.";
    if (!form.leaderEmail.trim()) nextErrors.leaderEmail = "Leader email is required.";
    if (!form.leaderCourse.trim()) nextErrors.leaderCourse = "Leader course is required.";
    if (!form.leaderRollNo.trim()) nextErrors.leaderRollNo = "Leader roll number is required.";
    if (!form.leaderPhone.trim()) nextErrors.leaderPhone = "Leader phone is required.";
    if (!form.leaderSemester.trim()) nextErrors.leaderSemester = "Leader semester is required.";
    if (!form.teamMembersName.trim()) nextErrors.teamMembersName = "Team members name is required.";
    if (!form.teamMembersCourse.trim()) nextErrors.teamMembersCourse = "Team members course is required.";
    if (!form.teamMembersEmail.trim()) nextErrors.teamMembersEmail = "Team members email is required.";
    if (!form.teamMembersSemester.trim()) nextErrors.teamMembersSemester = "Team members semester is required.";
    if (!form.teamMembersRollNo.trim()) nextErrors.teamMembersRollNo = "Team members roll no is required.";
    if (!form.ideaTitle.trim()) nextErrors.ideaTitle = "Idea title is required.";
    if (!form.ideaSummary.trim()) nextErrors.ideaSummary = "Project description is required.";
    if (!form.consent) nextErrors.consent = "Please confirm your details.";

    if (form.leaderEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.leaderEmail)) {
      nextErrors.leaderEmail = "Enter a valid email.";
    }
    if (form.leaderPhone && !/^\d{10}$/.test(form.leaderPhone)) {
      nextErrors.leaderPhone = "Contact number must be exactly 10 digits.";
    }
    if (form.ideaSummary.length > 1200) {
      nextErrors.ideaSummary = "Keep project description under 1200 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSuccess(false);

    if (!validateClient()) {
      setSubmitMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) {
        setIsSuccess(false);
        setSubmitMessage(result.message ?? "Submission failed. Please try again.");
        return;
      }

      setForm(initialForm);
      setErrors({});
      setIsSuccess(true);
      setSubmitMessage("Registration submitted successfully. We will contact shortlisted teams.");
    } catch {
      setIsSuccess(false);
      setSubmitMessage("Network issue. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">

        {/* ── Header row ── */}
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                Registration
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Lock in your spot at Xavathon
              </h2>
              <p className="max-w-xl text-sm leading-7 text-zinc-400">
                Fill the form carefully with accurate details. Keep team and project information ready before submitting.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Main grid ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">

          {/* Guidelines card */}
          <Reveal>
            <div className="panel h-full space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Important Guidelines
                </p>
                <p className="mt-1 text-base font-semibold text-white">
                  Read before registering
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">
                  Keep this ready
                </p>
                <ul className="mt-3 space-y-2">
                  {readyChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/80" />
                      <span className="text-xs leading-5 text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="space-y-4">
                {guidelines.map((g, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-zinc-400">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-6 text-zinc-400">{g}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-amber-400/15 bg-amber-400/5 px-4 py-3">
                <p className="text-xs leading-5 text-amber-300/80">
                  ⚠️ Shortlisted teams will be contacted via email or phone. Ensure contact details are accurate.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={0.1}>
            <div className="panel overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-3 border-b border-white/5 bg-white/2 px-4 py-4 sm:px-6">
                <p className="truncate text-sm font-semibold text-white">Official Registration Form</p>
              </div>

              <form id="register-form" onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
                <input
                  type="text"
                  value={safeForm.website}
                  onChange={(event) => updateField("website", event.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="rounded-xl border border-white/8 bg-white/3 p-4 sm:p-5">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-white">Team details</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="teamName" className={labelClassName}>
                        Team Name <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="teamName"
                        value={safeForm.teamName}
                        onChange={(event) => updateField("teamName", event.target.value)}
                        className={inputClassName}
                        placeholder="e.g. Code Titans"
                      />
                      {errors.teamName ? <p className="text-xs text-rose-300">{errors.teamName}</p> : null}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-white/3 p-4 sm:p-5">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-white">Team leader details</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="leaderName" className={labelClassName}>
                        Team Leader Name <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="leaderName"
                        value={safeForm.leaderName}
                        onChange={(event) => updateField("leaderName", event.target.value)}
                        className={inputClassName}
                        placeholder="Full name"
                      />
                      {errors.leaderName ? <p className="text-xs text-rose-300">{errors.leaderName}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="leaderEmail" className={labelClassName}>
                        Email <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="leaderEmail"
                        type="email"
                        value={safeForm.leaderEmail}
                        onChange={(event) => updateField("leaderEmail", event.target.value)}
                        className={inputClassName}
                        placeholder="name@email.com"
                      />
                      {errors.leaderEmail ? <p className="text-xs text-rose-300">{errors.leaderEmail}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="leaderCourse" className={labelClassName}>
                        Team Leader Course <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="leaderCourse"
                        value={safeForm.leaderCourse}
                        onChange={(event) => updateField("leaderCourse", event.target.value)}
                        className={inputClassName}
                        placeholder="e.g. B.Sc CS"
                      />
                      {errors.leaderCourse ? <p className="text-xs text-rose-300">{errors.leaderCourse}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="leaderRollNo" className={labelClassName}>
                        Team Leader Roll No. <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="leaderRollNo"
                        value={safeForm.leaderRollNo}
                        onChange={(event) => updateField("leaderRollNo", event.target.value)}
                        className={inputClassName}
                        placeholder="Enter roll number"
                      />
                      {errors.leaderRollNo ? <p className="text-xs text-rose-300">{errors.leaderRollNo}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="leaderPhone" className={labelClassName}>
                        Team Leader Contact No. <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="leaderPhone"
                        value={safeForm.leaderPhone}
                        onChange={(event) =>
                          updateField("leaderPhone", event.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        inputMode="numeric"
                        pattern="\d{10}"
                        maxLength={10}
                        className={inputClassName}
                        placeholder="10-digit number"
                      />
                      {errors.leaderPhone ? <p className="text-xs text-rose-300">{errors.leaderPhone}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="leaderSemester" className={labelClassName}>
                        Team Leader Semester <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="leaderSemester"
                        value={safeForm.leaderSemester}
                        onChange={(event) => updateField("leaderSemester", event.target.value)}
                        className={inputClassName}
                        placeholder="e.g. 6th Semester"
                      />
                      {errors.leaderSemester ? <p className="text-xs text-rose-300">{errors.leaderSemester}</p> : null}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-white/3 p-4 sm:p-5">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-white">Team members details</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="teamMembersName" className={labelClassName}>
                        Team Members Name <span className="text-orange-300">*</span>
                      </label>
                      <textarea
                        id="teamMembersName"
                        value={safeForm.teamMembersName}
                        onChange={(event) => updateField("teamMembersName", event.target.value)}
                        className="min-h-[90px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]"
                        placeholder="Member 1, Member 2, Member 3..."
                      />
                      {errors.teamMembersName ? <p className="text-xs text-rose-300">{errors.teamMembersName}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="teamMembersCourse" className={labelClassName}>
                        Team Members Course <span className="text-orange-300">*</span>
                      </label>
                      <textarea
                        id="teamMembersCourse"
                        value={safeForm.teamMembersCourse}
                        onChange={(event) => updateField("teamMembersCourse", event.target.value)}
                        className="min-h-[90px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]"
                        placeholder="B.Sc CS, BCA, ..."
                      />
                      {errors.teamMembersCourse ? <p className="text-xs text-rose-300">{errors.teamMembersCourse}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="teamMembersEmail" className={labelClassName}>
                        Team Members Email <span className="text-orange-300">*</span>
                      </label>
                      <textarea
                        id="teamMembersEmail"
                        value={safeForm.teamMembersEmail}
                        onChange={(event) => updateField("teamMembersEmail", event.target.value)}
                        className="min-h-[90px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]"
                        placeholder="a@mail.com, b@mail.com..."
                      />
                      {errors.teamMembersEmail ? <p className="text-xs text-rose-300">{errors.teamMembersEmail}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="teamMembersSemester" className={labelClassName}>
                        Team members semester <span className="text-orange-300">*</span>
                      </label>
                      <textarea
                        id="teamMembersSemester"
                        value={safeForm.teamMembersSemester}
                        onChange={(event) => updateField("teamMembersSemester", event.target.value)}
                        className="min-h-[90px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]"
                        placeholder="4th, 6th, ..."
                      />
                      {errors.teamMembersSemester ? <p className="text-xs text-rose-300">{errors.teamMembersSemester}</p> : null}
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="teamMembersRollNo" className={labelClassName}>
                        Team Members Roll No. <span className="text-orange-300">*</span>
                      </label>
                      <textarea
                        id="teamMembersRollNo"
                        value={safeForm.teamMembersRollNo}
                        onChange={(event) => updateField("teamMembersRollNo", event.target.value)}
                        className="min-h-[90px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]"
                        placeholder="Roll1, Roll2, Roll3..."
                      />
                      {errors.teamMembersRollNo ? <p className="text-xs text-rose-300">{errors.teamMembersRollNo}</p> : null}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-white/3 p-4 sm:p-5">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-white">Project details</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="ideaTitle" className={labelClassName}>
                        Project Title <span className="text-orange-300">*</span>
                      </label>
                      <input
                        id="ideaTitle"
                        value={safeForm.ideaTitle}
                        onChange={(event) => updateField("ideaTitle", event.target.value)}
                        className={inputClassName}
                        placeholder="One-line title for your solution"
                      />
                      {errors.ideaTitle ? <p className="text-xs text-rose-300">{errors.ideaTitle}</p> : null}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="ideaSummary" className={labelClassName}>
                        Project Description (Please Don&apos;t Copy Paste From AI) <span className="text-orange-300">*</span>
                      </label>
                      <textarea
                        id="ideaSummary"
                        value={safeForm.ideaSummary}
                        onChange={(event) => updateField("ideaSummary", event.target.value)}
                        className="min-h-[130px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blue-400/60 focus:bg-white/[0.07]"
                        placeholder="Describe your project clearly in your own words."
                        maxLength={1200}
                      />
                      <div className="flex items-center justify-between">
                        {errors.ideaSummary ? <p className="text-xs text-rose-300">{errors.ideaSummary}</p> : <span />}
                        <p className="text-[11px] text-zinc-500">{safeForm.ideaSummary.length}/1200</p>
                      </div>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={safeForm.consent}
                    onChange={(event) => updateField("consent", event.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>I confirm all details are accurate and submitted by the team.</span>
                </label>
                {errors.consent ? <p className="text-xs text-rose-300">{errors.consent}</p> : null}

                {submitMessage ? (
                  <p className={`text-sm ${isSuccess ? "text-emerald-300" : "text-rose-300"}`}>{submitMessage}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium w-full rounded-xl border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

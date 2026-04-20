"use client";

import { forwardRef, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";

/** Xavathon rules: exactly five people per team (1 leader + 4 members). */
const FIXED_TEAM_SIZE = 5;

type Participant = {
  fullName: string;
  email: string;
  phone: string;
  rollNumber: string;
  department: string;
};

export type HackathonFormData = {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;

  department: string;
  semester: string;
  teamSize: number;
  participants: Participant[];
  projectTitle: string;
  problemStatement: string;
  projectDescription: string;
  whyParticipate: string;
  participatedBefore: boolean;
  terms: boolean;
  website?: string;
};

const emptyParticipant = (): Participant => ({
  fullName: "",
  email: "",
  phone: "",
  rollNumber: "",
  department: "",
});

const defaultValues: HackathonFormData = {
  teamName: "",
  leaderName: "",
  leaderEmail: "",
  leaderPhone: "",

  department: "",
  semester: "",
  teamSize: FIXED_TEAM_SIZE,
  participants: Array.from({ length: FIXED_TEAM_SIZE }, () => emptyParticipant()),
  projectTitle: "",
  problemStatement: "",
  projectDescription: "",
  whyParticipate: "",
  participatedBefore: false,
  terms: false,
  website: "",
};

const phone10 = (v: string) => v.replace(/\D/g, "").slice(0, 10);

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<HackathonFormData>({
    mode: "onBlur",
    defaultValues,
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "participants",
  });
  const leaderName = useWatch({ control, name: "leaderName" });
  const leaderEmail = useWatch({ control, name: "leaderEmail" });
  const leaderPhone = useWatch({ control, name: "leaderPhone" });
  const department = useWatch({ control, name: "department" });

  useEffect(() => {
    if (fields.length !== FIXED_TEAM_SIZE) {
      replace(Array.from({ length: FIXED_TEAM_SIZE }, () => emptyParticipant()));
    }
  }, [fields.length, replace]);

  useEffect(() => {
    // Keep participant 1 in sync with leader details from step 1.
    setValue("participants.0.fullName", leaderName ?? "");
    setValue("participants.0.email", leaderEmail ?? "");
    setValue("participants.0.phone", phone10(leaderPhone ?? ""));
    setValue("participants.0.department", department ?? "");
  }, [leaderName, leaderEmail, leaderPhone, department, setValue]);

  const teamSize = FIXED_TEAM_SIZE;

  const participantFieldPaths = (index: number) =>
    (["fullName", "email", "phone", "rollNumber", "department"] as const).map(
      (field) => `participants.${index}.${field}` as const,
    );

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    if (step === 1) {
      fieldsToValidate = [
        "teamName",
        "leaderName",
        "leaderEmail",
        "leaderPhone",
        "department",
        "semester",
      ];
    } else if (step === 2) {
      fieldsToValidate = fields.flatMap((_, index) => [...participantFieldPaths(index)] as unknown as string[]);
    } else if (step === 3) {
      fieldsToValidate = ["projectTitle", "problemStatement", "projectDescription", "whyParticipate", "terms"];
    }

    const isStepValid = await trigger(fieldsToValidate as never);
    if (isStepValid) {
      setStep((s) => s + 1);
      const formEl = document.getElementById("register-form");
      if (formEl) {
        const top = formEl.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    } else {
      toast.error("Please fix the errors before proceeding.");
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    const formEl = document.getElementById("register-form");
    if (formEl) {
      const top = formEl.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const onSubmit = async (data: HackathonFormData) => {
    const rows = (getValues("participants") ?? data.participants).slice(0, FIXED_TEAM_SIZE);
    if (rows.length !== FIXED_TEAM_SIZE) {
      toast.error(`Exactly ${FIXED_TEAM_SIZE} team members are required.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        teamSize: FIXED_TEAM_SIZE,
        leaderPhone: phone10(data.leaderPhone),
        participants: rows.map((p) => ({
          ...p,
          phone: phone10(p.phone),
        })),
      };

      const response = await fetch("/api/hackathon/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (response.ok && result.ok) {
        window.location.href = "https://chat.whatsapp.com/JajPdHZNXFqF9J3tbn5mTu?mode=gi_t";
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div id="register-form" className="mx-auto max-w-3xl px-1 sm:px-0">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mb-10 space-y-4">
        <div className="flex justify-between text-sm font-medium text-zinc-400">
          <span>Step {step} of 3</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-linear-to-r from-orange-500 to-amber-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" {...register("teamSize", { valueAsNumber: true })} />
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Team information</h2>
                <p className="text-zinc-400">Tell us about your team and its leader.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputGroup
                  label="Team name"
                  id="teamName"
                  placeholder="Enter team name"
                  required
                  error={errors.teamName?.message}
                  {...register("teamName", { required: "Team name is required" })}
                />
                <InputGroup
                  label="Team leader name"
                  id="leaderName"
                  placeholder="Full name"
                  required
                  error={errors.leaderName?.message}
                  {...register("leaderName", { required: "Leader name is required" })}
                />
                <InputGroup
                  label="Leader email"
                  id="leaderEmail"
                  type="email"
                  placeholder="email@example.com"
                  required
                  error={errors.leaderEmail?.message}
                  {...register("leaderEmail", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/i, message: "Invalid email" },
                  })}
                />
                <InputGroup
                  label="Leader mobile no."
                  id="leaderPhone"
                  placeholder="Mobile no."
                  required
                  inputMode="numeric"
                  maxLength={10}
                  error={errors.leaderPhone?.message}
                  {...register("leaderPhone", {
                    required: "Phone is required",
                    validate: (v) => /^\d{10}$/.test(phone10(String(v))) || "Enter exactly 10 digits",
                  })}
                />

                <InputGroup
                  label="Department / course"
                  id="department"
                  placeholder="e.g. Computer Science"
                  required
                  error={errors.department?.message}
                  {...register("department", { required: "Department is required" })}
                />
                <InputGroup
                  label="Year / semester"
                  id="semester"
                  placeholder="e.g. 3rd year / 6th sem"
                  required
                  error={errors.semester?.message}
                  {...register("semester", { required: "Semester is required" })}
                />
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                  <p className="text-sm font-medium text-zinc-200">Team size</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    Each team must have exactly <strong className="text-zinc-300">{FIXED_TEAM_SIZE} members</strong>{" "}
                    (1 leader + 4 members). You will enter all {FIXED_TEAM_SIZE} in the next step.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Participant details</h2>
                <p className="text-zinc-400">
                  Leader details are auto-filled from step 1. Add class roll no. for leader and full details for members.
                </p>
              </div>

              <div className="space-y-8">
                {fields.map((field, index) => (
                  <div key={field.id} className="panel-subtle relative space-y-6 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-orange-400">
                        Participant {index + 1}
                        {index === 0 ? <span className="ml-2 text-xs text-zinc-500">(Leader)</span> : null}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <InputGroup
                        label="Full name"
                        id={`participants.${index}.fullName`}
                        placeholder="Name"
                        required
                        disabled={index === 0}
                        error={errors.participants?.[index]?.fullName?.message}
                        {...register(`participants.${index}.fullName`, {
                          required: "Full name is required",
                        })}
                      />
                      <InputGroup
                        label="Email"
                        id={`participants.${index}.email`}
                        type="email"
                        placeholder="email@example.com"
                        required
                        disabled={index === 0}
                        error={errors.participants?.[index]?.email?.message}
                        {...register(`participants.${index}.email`, {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+\.\S+$/i, message: "Invalid email" },
                        })}
                      />
                      <InputGroup
                        label="Mobile no."
                        id={`participants.${index}.phone`}
                        placeholder="Mobile no."
                        required
                        disabled={index === 0}
                        inputMode="numeric"
                        maxLength={10}
                        error={errors.participants?.[index]?.phone?.message}
                        {...register(`participants.${index}.phone`, {
                          required: "Phone is required",
                          validate: (v) => /^\d{10}$/.test(phone10(String(v))) || "Enter exactly 10 digits",
                        })}
                      />
                      <InputGroup
                        label="Class roll no."
                        id={`participants.${index}.rollNumber`}
                        placeholder="Class roll no."
                        required
                        error={errors.participants?.[index]?.rollNumber?.message}
                        {...register(`participants.${index}.rollNumber`, {
                          required: "Class roll no. is required",
                        })}
                      />
                      <InputGroup
                        label="Course / department"
                        id={`participants.${index}.department`}
                        placeholder="e.g. BCA / CSE"
                        required
                        disabled={index === 0}
                        error={errors.participants?.[index]?.department?.message}
                        {...register(`participants.${index}.department`, {
                          required: "Department is required",
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Project details & submit</h2>
                <p className="text-zinc-400">Describe your project and submit your registration.</p>
              </div>

              <div className="space-y-6">
                <InputGroup
                  label="Project title"
                  id="projectTitle"
                  placeholder="Project name"
                  error={errors.projectTitle?.message}
                  {...register("projectTitle",)}
                />

                <div className="space-y-2">
                  <label htmlFor="problemStatement" className="text-sm font-medium text-zinc-300">
                    Problem statement
                  </label>
                  <textarea
                    id="problemStatement"
                    rows={3}
                    placeholder="Short description of the problem you are solving"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-orange-500/50"
                    {...register("problemStatement")}
                  />
                  {errors.problemStatement ? (
                    <p className="text-xs text-red-400">{errors.problemStatement.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectDescription" className="text-sm font-medium text-zinc-300">
                    Project description
                  </label>
                  <textarea
                    id="projectDescription"
                    rows={4}
                    placeholder="Describe your solution in detail"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-orange-500/50"
                    {...register("projectDescription")}
                  />
                  {errors.projectDescription ? (
                    <p className="text-xs text-red-400">{errors.projectDescription.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label htmlFor="whyParticipate" className="text-sm font-medium text-zinc-300">
                    Why do you want to participate?
                  </label>
                  <textarea
                    id="whyParticipate"

                    rows={3}
                    placeholder="Tell us about your motivation"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-orange-500/50"
                    {...register("whyParticipate")}
                  />
                  {errors.whyParticipate ? (
                    <p className="text-xs text-red-400">{errors.whyParticipate.message}</p>
                  ) : null}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="participatedBefore"
                    className="h-5 w-5 rounded-md border-white/10 bg-white/5 accent-orange-500"
                    {...register("participatedBefore")}
                  />
                  <label htmlFor="participatedBefore" className="text-sm text-zinc-300">
                    Have you participated in hackathons before?
                  </label>
                </div>

                <div className="panel-subtle space-y-4 p-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-5 w-5 rounded-md border-white/10 bg-white/5 accent-orange-500"
                      {...register("terms", { required: "You must agree to the terms" })}
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed text-zinc-400">
                      I agree to the terms and conditions of Xavathon. I confirm that all participants listed are
                      currently enrolled in the college and will follow the event guidelines.
                    </label>
                  </div>
                  {errors.terms ? <p className="text-xs text-red-400">{errors.terms.message}</p> : null}
                </div>

                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
                  <p className="text-xs leading-relaxed text-orange-200/80">
                    <strong>Note:</strong> Once submitted, team details cannot be changed. Ensure all information is
                    accurate.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="btn-premium flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-premium flex items-center gap-2 rounded-full border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-8 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(249,115,22,0.4)]"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-premium flex items-center gap-2 rounded-full border border-orange-300/70 bg-linear-to-r from-orange-500 to-amber-400 px-10 py-3 text-sm font-bold text-black shadow-[0_10px_30px_rgba(249,115,22,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit registration
                  <Check className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

type InputGroupProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(function InputGroup(
  { label, error, className, id, ...props },
  ref,
) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none transition-all focus:border-orange-500/50",
          error && "border-red-500/50 focus:border-red-500",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
});

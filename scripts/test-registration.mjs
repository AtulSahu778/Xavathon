#!/usr/bin/env node

const baseUrl = process.env.TEST_BASE_URL || "http://localhost:3000";
const endpoint = new URL("/api/hackathon/register", baseUrl).toString();

const demoPayload = {
  teamName: "Demo Innovators",
  leaderName: "Aarav Singh",
  leaderEmail: "aarav.singh@example.com",
  leaderPhone: "9876543210",
  department: "Computer Science",
  semester: "6th Semester",
  teamSize: 5,
  participants: [
    {
      fullName: "Aarav Singh",
      email: "aarav.singh@example.com",
      phone: "9876543210",
      rollNumber: "CS601",
      department: "Computer Science",
    },
    {
      fullName: "Riya Sharma",
      email: "riya.sharma@example.com",
      phone: "9876543211",
      rollNumber: "CS602",
      department: "Computer Science",
    },
    {
      fullName: "Kabir Verma",
      email: "kabir.verma@example.com",
      phone: "9876543212",
      rollNumber: "CS603",
      department: "Computer Science",
    },
    {
      fullName: "Ananya Das",
      email: "ananya.das@example.com",
      phone: "9876543213",
      rollNumber: "CS604",
      department: "Computer Science",
    },
    {
      fullName: "Ishaan Roy",
      email: "ishaan.roy@example.com",
      phone: "9876543214",
      rollNumber: "CS605",
      department: "Computer Science",
    },
  ],
  projectTitle: "Campus Assist AI",
  problemStatement: "Students struggle to find quick academic and event information.",
  projectDescription: "An AI assistant that answers campus queries and tracks event notices.",
  whyParticipate: "To build a real solution for college students and learn from mentors.",
  participatedBefore: true,
  terms: true,
};

async function run() {
  console.log("Submitting demo registration to:", endpoint);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(demoPayload),
  });

  const text = await response.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }

  console.log("Status:", response.status, response.statusText);
  console.log("Response:", JSON.stringify(body, null, 2));

  if (!response.ok || body?.ok === false) {
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error("Demo submit failed:", err.message);
  process.exit(1);
});

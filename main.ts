// main.ts
import {
  ZypherAgent,
  createZypherContext,
  AnthropicModelProvider,
} from "@corespeed/zypher";
import { eachValueFrom } from "npm:rxjs-for-await";
import { createStudyPlan } from "./tools/studyplan.ts";

function getEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

// ---------- Small input helpers ----------

function askTopic(): string {
  while (true) {
    const answer = prompt("📚 What topic do you want to study?")?.trim();
    if (answer) return answer;
    console.log("Please enter a non-empty topic.\n");
  }
}

function askWeeks(): number {
  while (true) {
    const answer = prompt("⏱️ For how many weeks? (positive integer)")?.trim();
    if (!answer) {
      console.log("Please enter a number.\n");
      continue;
    }
    const n = Number(answer);
    if (Number.isInteger(n) && n > 0) return n;
    console.log("Please enter a positive whole number (e.g. 4).\n");
  }
}

type Level = "beginner" | "intermediate" | "advanced";

function askLevel(): Level {
  while (true) {
    const answer = prompt(
      '🎯 What is your level? (beginner / intermediate / advanced)',
    )
      ?.trim()
      .toLowerCase();

    if (
      answer === "beginner" ||
      answer === "intermediate" ||
      answer === "advanced"
    ) {
      return answer;
    }
    console.log('Please type exactly: "beginner", "intermediate", or "advanced".\n');
  }
}

// ---------- Agent setup ----------

async function createAgent() {
  const ctx = await createZypherContext(Deno.cwd());

  const provider = new AnthropicModelProvider({
    apiKey: getEnv("ANTHROPIC_API_KEY"),
  });

  const agent = new ZypherAgent(ctx, provider, {
    config: { maxTokens: 2048 },
  });

  return agent;
}

const agent = await createAgent();

// ---------- Core actions ----------

async function generateAndRefinePlan(): Promise<string> {
  const topic = askTopic();
  const weeks = askWeeks();
  const level = askLevel();

  const plan = createStudyPlan({ topic, weeks, level });

  console.log("\n--- ZOD VALIDATED STUDY PLAN ---\n");
  console.log(plan);

  const events = agent.runTask(
    `You are a friendly, practical study coach.\n\n` +
      `Here is a study plan:\n\n${plan}\n\n` +
      `Refine this with daily tasks and practical tips. Keep it clear and not too wordy.`,
    "claude-3-haiku-20240307",
  );

  console.log("\n--- AGENT STUDY COACH RESPONSE ---\n");

  let finalText = "";

  for await (const event of eachValueFrom(events)) {
    if (event.type === "text") {
      finalText += event.content;
      await Deno.stdout.write(new TextEncoder().encode(event.content));
    }
  }

  console.log("\n\n--- FINAL COLLECTED PLAN ---\n");
  console.log(finalText);

  return finalText;
}

async function askFollowUp(lastPlan: string | null): Promise<void> {
  if (!lastPlan) {
    console.log("\n⚠️ No plan exists yet. Generate a study plan first.\n");
    return;
  }

  const question = prompt(
    "\n❓ What follow-up question do you want to ask about this plan?",
  )?.trim();

  if (!question) {
    console.log("\nNo question entered. Returning to menu.\n");
    return;
  }

  const qaEvents = agent.runTask(
    `You are a helpful study coach.\n\n` +
      `Here is the current study plan:\n\n${lastPlan}\n\n` +
      `The student has this question:\n"${question}".\n\n` +
      `Answer clearly and practically. If it helps, you can adjust or extend the plan.`,
    "claude-3-haiku-20240307",
  );

  console.log("\n--- STUDY COACH ANSWER ---\n");

  let answerText = "";

  for await (const event of eachValueFrom(qaEvents)) {
    if (event.type === "text") {
      answerText += event.content;
      await Deno.stdout.write(new TextEncoder().encode(event.content));
    }
  }

  console.log("\n\n--- FULL ANSWER ---\n");
  console.log(answerText);
}

// ---------- Simple CLI loop ----------

console.log("\n📘 Welcome to the Zypher Study Coach (v0.5.1)\n");

let lastPlan: string | null = null;

mainLoop:
while (true) {
  console.log("\nWhat would you like to do?");
  console.log("1) Create a new study plan");
  console.log("2) Ask a follow-up question about the last plan");
  console.log("3) Exit");

  const choice = prompt("\nEnter 1, 2, or 3:")?.trim();

  switch (choice) {
    case "1":
      lastPlan = await generateAndRefinePlan();
      break;

    case "2":
      await askFollowUp(lastPlan);
      break;

    case "3":
      console.log("\n👋 Goodbye! Happy studying.\n");
      break mainLoop;

    default:
      console.log("\nPlease enter a valid option: 1, 2, or 3.\n");
  }
}













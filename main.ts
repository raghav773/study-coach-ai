import {
  ZypherAgent,
  createZypherContext,
  AnthropicModelProvider,
} from "@corespeed/zypher";

import { createStudyPlan } from "./tools/studyplan.ts";

function getEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

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

// Example tool input
const plan = createStudyPlan({
  topic: "maths",
  weeks: 4,
  level: "beginner"
});

console.log("\n--- ZOD VALIDATED STUDY PLAN ---\n");
console.log(plan);

// Now ask Zypher agent to refine it
const response = await agent.runTask(
  `Here is a study plan:\n\n${plan}\n\nImprove it with daily tasks and tips.`,
  "claude-3-haiku-20240307"
);

console.log("\n--- AGENT RESPONSE ---\n");
console.log(response);









import "jsr:@std/dotenv/load";

import {
  createZypherContext,
  ZypherAgent,
  AnthropicModelProvider,
  runAgentInTerminal,
} from "@corespeed/zypher";

import { createStudyPlanTool } from "./tools/studyplan.ts";

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

  // 0.5.x correct API
  agent.tools([createStudyPlanTool]);

  return agent;
}

const agent = await createAgent();
console.log("\nWelcome to the Zypher Study Coach!\n");

await runAgentInTerminal(agent, "claude-3-haiku-20240307");






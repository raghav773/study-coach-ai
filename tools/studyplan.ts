// tools/studyplan.ts
import { tool } from "@corespeed/zypher";
import { z } from "zod";

export const createStudyPlanTool = tool({
  name: "create_study_plan",
  description: "Generate a structured weekly study plan.",
  inputSchema: z.object({
    topic: z.string(),
    weeks: z.number().int().positive(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
  }),

  async execute({ topic, weeks, level }) {
    const lines: string[] = [];

    for (let i = 1; i <= weeks; i++) {
      lines.push(`Week ${i}: Focus on ${topic} (${level} level)`);
    }

    return {
      plan: lines.join("\n"),
    };
  },
});







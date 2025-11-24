import { z } from "zod";

export const studyPlanSchema = z.object({
  topic: z.string(),
  weeks: z.number().int().positive(),
  level: z.enum(["beginner", "intermediate", "advanced"])
});

export function createStudyPlan(input: unknown): string {
  const { topic, weeks, level } = studyPlanSchema.parse(input);

  const lines: string[] = [];

  for (let i = 1; i <= weeks; i++) {
    lines.push(`Week ${i}: Focus on ${topic} (${level} level)`);
  }

  return lines.join("\n");
}







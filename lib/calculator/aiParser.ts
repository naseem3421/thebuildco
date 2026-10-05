import { AIInterpretationResult } from "@/app/api/calculator/interpret/route";

export async function interpretDreamHome(prompt: string): Promise<AIInterpretationResult | null> {
  try {
    const res = await fetch("/api/calculator/interpret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) {
      return json.data as AIInterpretationResult;
    }
    return null;
  } catch (err) {
    console.warn("[AI Parser Client Error]", err);
    return null;
  }
}

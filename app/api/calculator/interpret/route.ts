import { NextRequest, NextResponse } from "next/server";

export interface AIInterpretationResult {
  plot_sqft: number | null;
  plot_dimensions: string | null;
  plot_unit: "sqft" | "cent" | "ground" | null;
  floors: 1 | 2 | 3 | 4 | null;
  bhk: 2 | 3 | 4 | null;
  home_type: "independent_house" | "duplex" | "villa" | null;
  parking: 0 | 1 | 2 | 3 | null;
  package: "basic" | "standard" | "premium" | "luxury" | null;
  addons: string[];
  confidence: number;
}

/**
 * High-precision Indian Construction NLP Rule Engine (Fallback & Fast Path)
 */
function parseRequirementsHeuristic(prompt: string): AIInterpretationResult {
  const p = prompt.toLowerCase();

  let plot_sqft: number | null = null;
  let plot_dimensions: string | null = null;
  let plot_unit: "sqft" | "cent" | "ground" | null = null;
  let floors: 1 | 2 | 3 | 4 | null = null;
  let bhk: 2 | 3 | 4 | null = null;
  let home_type: "independent_house" | "duplex" | "villa" | null = null;
  let parking: 0 | 1 | 2 | 3 | null = null;
  let pkg: "basic" | "standard" | "premium" | "luxury" | null = null;
  const addons: string[] = [];
  let score = 0.5;

  // 1. Plot Dimensions match (e.g. 30x40, 30*40, 30 by 40, 20x30, 40x60)
  const dimMatch = p.match(/(\d{2,3})\s*(?:x|\*|by)\s*(\d{2,3})/i);
  if (dimMatch) {
    const w = parseInt(dimMatch[1], 10);
    const l = parseInt(dimMatch[2], 10);
    plot_dimensions = `${w} × ${l}`;
    plot_sqft = w * l;
    plot_unit = "sqft";
    score += 0.2;
  }

  // 2. Grounds match (e.g. 1 ground, 2 grounds, 0.5 ground)
  const groundMatch = p.match(/(\d+(?:\.\d+)?)\s*(?:ground|grounds)/i);
  if (groundMatch) {
    const g = parseFloat(groundMatch[1]);
    plot_sqft = Math.round(g * 2400);
    plot_unit = "ground";
    plot_dimensions = `${g} Ground${g > 1 ? "s" : ""}`;
    score += 0.2;
  }

  // 3. Cents match (e.g. 3 cents, 2.5 cent)
  const centMatch = p.match(/(\d+(?:\.\d+)?)\s*(?:cent|cents)/i);
  if (centMatch) {
    const c = parseFloat(centMatch[1]);
    plot_sqft = Math.round(c * 435.6);
    plot_unit = "cent";
    plot_dimensions = `${c} Cent${c > 1 ? "s" : ""}`;
    score += 0.2;
  }

  // 4. Sqft direct match (e.g. 1200 sqft, 1500 sq ft, 2400 sq.ft)
  const sqftMatch = p.match(/(\d{3,5})\s*(?:sqft|sq\s*ft|sq\.ft|square\s*feet)/i);
  if (sqftMatch && !plot_sqft) {
    plot_sqft = parseInt(sqftMatch[1], 10);
    plot_unit = "sqft";
    score += 0.15;
  }

  // 5. BHK match (e.g. 2bhk, 3 bhk, 4-bhk)
  const bhkMatch = p.match(/(\d)\s*(?:bhk|bedroom|bed)/i);
  if (bhkMatch) {
    const b = parseInt(bhkMatch[1], 10);
    if (b >= 2 && b <= 4) {
      bhk = b as 2 | 3 | 4;
      score += 0.15;
    }
  }

  // 6. Home Type & Floors
  if (p.includes("duplex")) {
    home_type = "duplex";
    floors = 2;
    score += 0.15;
  } else if (p.includes("villa")) {
    home_type = "villa";
    floors = 2;
    score += 0.15;
  } else if (p.includes("triplex") || p.includes("g+2") || p.includes("3 floor") || p.includes("three floor")) {
    home_type = "independent_house";
    floors = 3;
    score += 0.15;
  } else if (p.includes("g+3") || p.includes("4 floor") || p.includes("four floor")) {
    home_type = "independent_house";
    floors = 4;
    score += 0.15;
  } else if (p.includes("ground only") || p.includes("single floor") || p.includes("1 floor")) {
    home_type = "independent_house";
    floors = 1;
    score += 0.15;
  } else if (p.includes("g+1") || p.includes("2 floor") || p.includes("two floor")) {
    home_type = "duplex";
    floors = 2;
    score += 0.15;
  } else if (bhk && !floors) {
    // Sensible inference: 3BHK and 4BHK usually duplex G+1
    floors = bhk >= 3 ? 2 : 1;
    home_type = bhk >= 3 ? "duplex" : "independent_house";
  }

  // 7. Parking
  if (p.includes("2 car") || p.includes("two car") || p.includes("2 cars")) {
    parking = 2;
  } else if (p.includes("3 car") || p.includes("3 cars")) {
    parking = 3;
  } else if (p.includes("parking") || p.includes("car") || p.includes("garage") || p.includes("porch")) {
    parking = 1;
  }

  // 8. Package Intent
  if (p.includes("luxury") || p.includes("ultra") || p.includes("italian marble") || p.includes("high end")) {
    pkg = "luxury";
  } else if (p.includes("premium") || p.includes("best quality") || p.includes("teak")) {
    pkg = "premium";
  } else if (p.includes("budget") || p.includes("basic") || p.includes("cheap") || p.includes("low cost")) {
    pkg = "standard";
  } else if (p.includes("standard") || p.includes("rental") || p.includes("medium")) {
    pkg = "standard";
  }

  // 9. Addons detection
  if (p.includes("solar")) addons.push("solar_panels");
  if (p.includes("lift") || p.includes("elevator")) addons.push("lift");
  if (p.includes("cctv") || p.includes("security camera")) addons.push("cctv_system");
  if (p.includes("smart") || p.includes("automation")) addons.push("smart_home");
  if (p.includes("sump")) addons.push("underground_sump");
  if (p.includes("compound") || p.includes("boundary")) addons.push("compound_wall");

  return {
    plot_sqft: plot_sqft || 1200,
    plot_dimensions: plot_dimensions || (plot_sqft ? `${plot_sqft} sqft` : "30 × 40"),
    plot_unit: plot_unit || "sqft",
    floors: floors || 2,
    bhk: bhk || 3,
    home_type: home_type || "duplex",
    parking: parking !== null ? parking : 1,
    package: pkg || "premium",
    addons,
    confidence: Math.min(0.98, score),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a description of your dream home.",
        },
        { status: 400 }
      );
    }

    // Attempt Gemini or LLM API if key is available, else use heuristic engine
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const systemPrompt = `You are a construction calculator input parser for an Indian residential construction company in Chennai (The Build Company).
Your job is ONLY to interpret natural-language home requirements.
Return valid JSON strictly matching this schema:
{
  "plot_sqft": number or null,
  "plot_dimensions": string or null (e.g. "30 × 40"),
  "plot_unit": "sqft" | "cent" | "ground" | null,
  "floors": 1 | 2 | 3 | 4 | null,
  "bhk": 2 | 3 | 4 | null,
  "home_type": "independent_house" | "duplex" | "villa" | null,
  "parking": 0 | 1 | 2 | 3 | null,
  "package": "basic" | "standard" | "premium" | "luxury" | null,
  "addons": string[],
  "confidence": number between 0.0 and 1.0
}
Rules:
- Never invent prices or costs.
- Chennai standard: 1 ground = 2400 sqft, 1 cent = 435.6 sqft. 30x40 = 1200 sqft.
- If user says 'duplex', infer floors = 2.
- If user mentions parking, parking = 1.
- Output ONLY raw JSON.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: systemPrompt },
                    { text: `Parse this requirement: "${prompt}"` },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.1,
              },
            }),
          }
        );

        if (response.ok) {
          const aiData = await response.json();
          const rawText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json({
              success: true,
              data: {
                ...parseRequirementsHeuristic(prompt), // baseline
                ...parsed,
              },
              source: "llm",
            });
          }
        }
      } catch (llmErr) {
        console.warn("[AI Parser LLM Error - falling back to heuristic]", llmErr);
      }
    }

    // Heuristic NLP engine
    const heuristicResult = parseRequirementsHeuristic(prompt);
    return NextResponse.json({
      success: true,
      data: heuristicResult,
      source: "rule_engine",
    });
  } catch (error) {
    console.error("[Calculator Interpret Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Could not interpret prompt. Please proceed step-by-step.",
      },
      { status: 500 }
    );
  }
}

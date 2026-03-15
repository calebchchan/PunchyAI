import { Scenario, ScenarioCategory } from "./types";

export const CATEGORIES: ScenarioCategory[] = [
  "Investment Pitch",
  "Client & Sales Communication",
  "Small Talk & Networking",
  "Internal Communication",
];

export const SCENARIOS: Scenario[] = [
  // ── Investment Pitch ──────────────────────────────────────
  {
    id: "pitch-60-second-stock",
    title: "60-Second Stock Pitch",
    category: "Investment Pitch",
    difficulty: "Beginner",
    durationSeconds: 60,
    context:
      "You have 60 seconds. A Hong Kong-based long-only PM just sat down across from you at a conference. Pitch your best idea — long or short.",
    successCriteria: [
      "Lead with the conclusion — what's the stock and direction?",
      "Give 2 supporting reasons (valuation, catalyst, competitive edge)",
      "End with a clear catalyst and timeline",
      "Stay under 60 seconds",
    ],
    exampleStarters: [
      "The single best idea in APAC tech right now is...",
      "If you have room for one more name, I'd look at...",
      "I want to give you a short pitch on [company] — it's mispriced by 30%...",
    ],
  },
  {
    id: "pitch-elevator-pm",
    title: "Elevator Pitch to a Portfolio Manager",
    category: "Investment Pitch",
    difficulty: "Intermediate",
    durationSeconds: 90,
    context:
      "You step into an elevator with the head PM of a major long/short fund. You have 90 seconds before they reach their floor. You've been covering a sector where you've found a compelling asymmetric trade.",
    successCriteria: [
      "Hook in the first 5 seconds — why should they care?",
      "Clearly state the opportunity and expected return",
      "Acknowledge the key risk and why you're comfortable with it",
      "End with a specific ask or next step",
    ],
    exampleStarters: [
      "I know you're focused on [sector] — there's a setup I think you'll want to see...",
      "Quick one — I've found a name with 40% upside and a catalyst in 6 weeks...",
    ],
  },
  {
    id: "pitch-defend-thesis",
    title: "Defending Your Thesis Under Pushback",
    category: "Investment Pitch",
    difficulty: "Advanced",
    durationSeconds: 120,
    context:
      "You've just pitched your highest-conviction idea to an investment committee. The senior PM pushes back: 'The consensus is already there. What makes you think the market is wrong?' Defend your position.",
    successCriteria: [
      "Stay composed — don't get defensive",
      "Acknowledge the consensus view, then clearly state where you diverge",
      "Provide specific data points or channel checks that support your edge",
      "Concede what you could be wrong about, but reaffirm your conviction",
    ],
    exampleStarters: [
      "That's a fair point — the sell-side is indeed at X. But what the market is missing is...",
      "I hear you on consensus. Let me walk you through three data points that changed my view...",
    ],
  },
  {
    id: "pitch-sector-call",
    title: "Presenting a Sector Call to Clients",
    category: "Investment Pitch",
    difficulty: "Advanced",
    durationSeconds: 120,
    context:
      "You're on a conference call with 15 institutional clients. You need to present your sector outlook for the next quarter — what's your top pick, what are you avoiding, and why?",
    successCriteria: [
      "Open with a clear, memorable sector thesis in one sentence",
      "Structure as: overview → top pick → avoid → risks",
      "Use specific numbers — targets, multiples, earnings estimates",
      "Close with a clear call to action",
    ],
    exampleStarters: [
      "Good morning everyone. My message today is simple: [sector] is at an inflection point...",
      "Thank you for joining. I'll keep this tight — three things you need to know about [sector] this quarter...",
    ],
  },

  // ── Client & Sales Communication ──────────────────────────
  {
    id: "client-opening-hook",
    title: "Opening a Client Call with a Hook",
    category: "Client & Sales Communication",
    difficulty: "Beginner",
    durationSeconds: 30,
    context:
      "You're about to start a client call with a portfolio manager who takes 50 calls a week. You have 30 seconds to give them a reason to stay on the line.",
    successCriteria: [
      "Skip pleasantries — lead with value",
      "Reference something specific and timely",
      "Create curiosity — make them want to hear more",
    ],
    exampleStarters: [
      "Before we get into anything — there's a data point from last night that changes the setup for [stock]...",
      "I'll keep this quick. Three things happened this week that I think matter for your portfolio...",
    ],
  },
  {
    id: "client-corporate-access",
    title: "Pitching a Corporate Access Event",
    category: "Client & Sales Communication",
    difficulty: "Intermediate",
    durationSeconds: 60,
    context:
      "You need to convince a buy-side client to attend your firm's upcoming non-deal roadshow with the CFO of a mid-cap company. The client hasn't responded to your last two emails.",
    successCriteria: [
      "Lead with what's in it for them — not the logistics",
      "Explain why this management team is worth their time right now",
      "Create urgency without being pushy",
      "Offer a specific time slot",
    ],
    exampleStarters: [
      "I know your time is tight, so I'll be direct — this CFO is about to guide numbers higher and we've got 45 minutes with them...",
      "You mentioned last quarter you were looking at [sector] — we've set up something I think fits perfectly...",
    ],
  },
  {
    id: "client-ndr-followup",
    title: "Following Up After a Non-Deal Roadshow",
    category: "Client & Sales Communication",
    difficulty: "Intermediate",
    durationSeconds: 60,
    context:
      "You hosted a non-deal roadshow yesterday. One of your key clients attended the management meeting. You're calling to follow up and gauge their interest level.",
    successCriteria: [
      "Reference a specific moment from the meeting",
      "Gauge their reaction without leading the witness",
      "Offer additional value — a follow-up note, model, or call with your analyst",
      "Move toward a concrete next step",
    ],
    exampleStarters: [
      "Thanks for making time yesterday. I thought the CFO's comments on margins were particularly interesting — what was your take?",
      "Quick follow-up from yesterday — I wanted to get your read on the management team before I send my note out...",
    ],
  },
  {
    id: "client-handle-pass",
    title: "Handling 'I'll Pass' Objections",
    category: "Client & Sales Communication",
    difficulty: "Advanced",
    durationSeconds: 60,
    context:
      "You've pitched your best idea to a client and they say: 'Thanks, but I'll pass — it's not for us.' Don't let the conversation die. Re-engage without being desperate.",
    successCriteria: [
      "Acknowledge their decision gracefully",
      "Ask a smart diagnostic question — understand why",
      "Pivot to a different angle or a related idea",
      "Leave the door open for future conversations",
    ],
    exampleStarters: [
      "Totally fair. Out of curiosity — is it the timing, the sector, or something in the setup?",
      "Understood. Let me ask you this — what would need to change for this to be interesting?",
    ],
  },

  // ── Small Talk & Networking ───────────────────────────────
  {
    id: "networking-conference-icebreaker",
    title: "Conference Ice-Breakers",
    category: "Small Talk & Networking",
    difficulty: "Beginner",
    durationSeconds: 30,
    context:
      "You're at a finance conference during the coffee break. You spot someone whose badge says they work at a fund you'd like to cover. Start a conversation naturally.",
    successCriteria: [
      "Don't open with your firm name and title",
      "Find common ground — reference a panel, speaker, or market event",
      "Be genuinely curious, not transactional",
      "Transition naturally toward exchanging details",
    ],
    exampleStarters: [
      "That panel on China reopening was interesting — are you seeing any of that play out in your book?",
      "The coffee line is always where the best conversations happen at these things...",
    ],
  },
  {
    id: "networking-lapsed-client",
    title: "Reconnecting with a Lapsed Client",
    category: "Small Talk & Networking",
    difficulty: "Intermediate",
    durationSeconds: 60,
    context:
      "You run into a client you haven't spoken to in 6 months at an industry dinner. They used to be active but went quiet. Re-establish the relationship without being awkward about the gap.",
    successCriteria: [
      "Acknowledge the gap casually — don't over-apologize",
      "Show you've been paying attention to their world",
      "Offer something of value before asking for anything",
      "Suggest a specific, low-pressure follow-up",
    ],
    exampleStarters: [
      "Great to see you — it's been too long. I saw your fund had a strong quarter, congratulations...",
      "I've been meaning to reach out — I've got a few names I think would work really well for your book...",
    ],
  },
  {
    id: "networking-dinner-intro",
    title: "Introducing Yourself at a Dinner",
    category: "Small Talk & Networking",
    difficulty: "Beginner",
    durationSeconds: 30,
    context:
      "You're seated next to someone senior at an industry dinner. They ask 'So, what do you do?' Make your response memorable without sounding like a walking business card.",
    successCriteria: [
      "Avoid the generic '[title] at [firm]' formula",
      "Lead with what you do, not who you work for",
      "Be concise — leave room for them to ask more",
      "Show personality",
    ],
    exampleStarters: [
      "I help PMs find their next best idea in APAC tech — basically, I get paid to be obsessively curious about semiconductors...",
      "Short version: I cover [sector] and try to find things the market is getting wrong...",
    ],
  },

  // ── Internal Communication ────────────────────────────────
  {
    id: "internal-morning-meeting",
    title: "Morning Meeting Stock Mention (30 sec)",
    category: "Internal Communication",
    difficulty: "Beginner",
    durationSeconds: 30,
    context:
      "It's 7:15 AM. You have 30 seconds in the morning meeting to highlight one actionable idea for the sales desk. Everyone is half-awake. Make it count.",
    successCriteria: [
      "Lead with the stock name and direction",
      "One sentence on why — the catalyst or data point",
      "Who cares — which client segments should the desk target",
      "Keep it under 30 seconds",
    ],
    exampleStarters: [
      "[Stock] is a buy into earnings next week. Three things you need to tell clients...",
      "Quick one — [Stock] is trading at a 2-year low and our analyst just upgraded...",
    ],
  },
  {
    id: "internal-model-change",
    title: "Explaining a Model Change to a Senior Analyst",
    category: "Internal Communication",
    difficulty: "Intermediate",
    durationSeconds: 60,
    context:
      "You've updated the financial model for a key coverage name and the new numbers are materially different from the previous estimates. Your senior analyst wants to understand why before publishing.",
    successCriteria: [
      "Start with the conclusion — what changed and by how much",
      "Walk through the 2-3 key assumption changes",
      "Explain the data source or reasoning behind each change",
      "Flag any remaining areas of uncertainty",
    ],
    exampleStarters: [
      "I've taken our FY25 EPS estimate down 15%. Three drivers...",
      "The big change is in revenue assumptions — here's why I've moved them...",
    ],
  },
  {
    id: "internal-theme-idea",
    title: "Presenting a Theme Idea in a Team Meeting",
    category: "Internal Communication",
    difficulty: "Intermediate",
    durationSeconds: 90,
    context:
      "You've identified a thematic trend that could generate multiple trade ideas across your sector. Present it to your team to get buy-in for deeper research.",
    successCriteria: [
      "Open with a compelling observation or data point",
      "Frame the theme clearly in one sentence",
      "Connect it to 2-3 specific investable names",
      "Propose a concrete next step for the team",
    ],
    exampleStarters: [
      "I've been tracking something that I think could be our biggest call this year...",
      "Here's a trend that's showing up across three of my coverage names...",
    ],
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function getScenariosByCategory(
  category: ScenarioCategory
): Scenario[] {
  return SCENARIOS.filter((s) => s.category === category);
}

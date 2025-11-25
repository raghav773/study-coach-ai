# 📘 Zypher Study Coach (v0.5.1)

A simple AI-powered Study Coach built using **CoreSpeed Zypher (v0.5.1)** and **Claude 3 Haiku**.  
This project demonstrates how to build a lightweight agent that:

- Takes user input (topic, weeks, level)
- Validates it using Zod
- Generates a structured weekly study plan
- Sends it to a Zypher Agent for refinement
- Produces a detailed final study plan with daily tasks & tips
- Supports follow-up questions about the generated plan
- Runs through an interactive terminal UI

---

## 🚀 Features

### ✔️ Interactive CLI
Users can:
1. Create a study plan  
2. Ask follow-up questions  
3. Regenerate plans  

### ✔️ Zod Input Validation
Guarantees:
- Valid topic  
- Positive integer weeks  
- Level is beginner/intermediate/advanced  

### ✔️ Zypher Agent Integration
Uses:
- `ZypherAgent`
- `AnthropicModelProvider`
- `agent.runTask()` streaming output

### ✔️ Persistent Conversation Context
The agent remembers the last generated plan, so users can ask:

> “Add practice problems”  
> “Make week 1 easier”  
> “Extend the plan to 4 weeks”  

### ✔️ Works Fully in Terminal
No deployment needed. Just run the CLI.

---

## 📦 Project Structure

├── main.ts # Main CLI + agent logic
├── tools/
│ └── studyplan.ts # Zod schema + study plan generator
├── .env # API keys (not committed)
├── deno.json # Deno config
└── README.md


---

## 🛠️ Requirements

- **Deno 1.45+**
- **Anthropic API Key**
- Internet access for the model

---

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/raghav773/study-coach-ai.git
cd study-coach-ai

To Install Deno

https://deno.land/manual/getting_started/installation

Create a .env file

ANTHROPIC_API_KEY=your_api_key_here

▶️ Running the Project

Use this command: deno run --allow-env --allow-read --allow-net --env-file=.env main.ts

📘 Welcome to the Zypher Study Coach (v0.5.1)
What would you like to do?
1) Create a new study plan
2) Ask a follow-up question
3) Exit

The agent will then generate and refine your study plan interactively.

🧠 Built With

Zypher (v0.5.1)

Claude 3 Haiku

Deno Runtime

Zod for validation

```
---

## 🔮 Possible Future Enhancements

This project was intentionally designed to be simple, but the structure allows for many natural extensions.  
Here are several meaningful improvements that could be added next:

### 1. 🌟 Multi-Tool Support
Add more functions the agent can call, such as:
- `generate_quiz` – create practice questions or flashcards  
- `explain_topic` – simplify or break down complex subjects  
- `summarize_plan` – shorten a long study plan  
- `recommend_resources` – suggest books, videos, or courses  

These would turn the Study Coach into a more capable multi-tool agent.

### 2. 💾 Persistent Storage
Store the last generated study plans inside a JSON file (e.g., `/storage/plans.json`) so users can:
- View previous plans  
- Compare progress  
- Reload an old plan and continue asking questions  

### 3. 📁 Export to Text or PDF
Allow users to save their final study plan as:
- `.txt`
- `.md`
- `.pdf`

A single command could generate a shareable study plan file.

### 4. 🌈 Enhanced CLI Experience
Use a TUI/CLI framework like **Cliffy** to add:
- Colored output  
- Spinners/loading indicators  
- Better menus  
- Progress bars  

This would make the CLI feel more like a polished app.

### 5. 🧠 Natural Language Mode
Instead of selecting from a menu, allow users to type commands like:


Progress bars





#  Blostem Forge  
### AI-Powered Deal Intelligence Engine for B2B Fintech

Blostem Forge is an AI-driven system that transforms **regulatory signals and market insights** into **high-conversion enterprise deal narratives**.

Instead of generic sales outreach, it enables:

> **Signal-driven, stakeholder-aware, data-backed fintech pitches — generated in seconds.**

---

## 🚀 Live Demo

- 🌐 Frontend: https://blostem-forge-frontend.onrender.com  
- 📄 API Docs: https://blostem-backend-13o9.onrender.com/docs  

---

## 🎯 Problem Statement

B2B fintech sales (banks/NBFCs) are slow and inefficient because:

- Outreach is generic and not contextual  
- Regulatory changes are manually tracked  
- Stakeholder needs (Tech, Business, Compliance) are fragmented  
- Sales teams spend weeks researching a single prospect  

---

## 💡 Solution

Blostem Forge automates the entire process:

> **Bank Name → AI Analysis → Multi-Stakeholder Business Case**

It generates:

- Regulatory insights (RBI-driven)  
- Market intelligence  
- Technical feasibility (CTO view)  
- Revenue potential (Business view)  
- Compliance alignment (Regulatory view)  
- Final deal narrative + ROI estimate  

---

## 🧠 System Architecture

### 🔹 Signal Engine
- RBI circular simulation  
- Market signal detection  
- Identifies compliance triggers and growth gaps  

---

### 🔹 Intelligence Layer (AI Engine)

| Role       | Output                          |
|------------|--------------------------------|
| CTO        | Integration, APIs, architecture |
| Business   | Revenue growth, conversion impact |
| Compliance | RBI alignment, risk mitigation |

---

### 🔹 Deal Generation Engine
- Executive Summary  
- Stakeholder insights  
- ROI estimation  
- Sales-ready narrative  

---

## ✨ Key Features

- ⚡ Real-time deal generation  
- 🧩 Multi-stakeholder intelligence  
- 📊 Structured JSON output  
- 🌐 Shareable Deal Room concept  
- 🎯 Fintech + regulatory focused  

---

## 🛠️ Tech Stack

### Frontend
- React + Vite  
- Tailwind CSS  
- Shadcn/UI  

### Backend
- FastAPI (Python)  
- Uvicorn  

### AI Layer
- Prompt-engineered LLM  
- Structured JSON output  

---

## 📂 Project Structure

```

blostem-forge/
│
├── backend/                # AI Engine (FastAPI)
│   ├── app.py
│   └── requirements.txt
│
├── src/                    # Frontend (Lovable React app)
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── lib/
│
├── public/                 # Static assets
├── shared/                 # JSON contract (API schema)
├── package.json
├── index.html
└── README.md

```

---

## 🔗 System Flow

```

User Input (Bank Name)
↓
Frontend (Lovable UI)
↓
FastAPI Backend (/generate-deal)
↓
AI Processing (Signals + Stakeholder Logic)
↓
Structured JSON Output
↓
Rendered Dashboard + Deal Room

````

---

## 🏗️ Architecture Diagram

```mermaid
graph TD

A[User Input - Bank Name] --> B[Frontend - Lovable UI]
B --> C[API Call /generate-deal]

C --> D[FastAPI Backend]
D --> E[Intelligence Layer]

E --> F[Signal Processing - RBI + Market]
E --> G[Stakeholder Analysis - CTO / Business / Compliance]

F --> H[Forge Engine - Deal Generation]
G --> H

H --> I[Structured JSON Output]

I --> J[Frontend Dashboard]
J --> K[Deal Room View]
````

---

## ▶️ How to Run Locally

### 🔹 1. Clone Repository

```bash
git clone https://github.com/Sakshichikhale1/blostem-forge.git
cd blostem-forge
```

---

### 🔹 2. Run Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 5000
```

Backend:
[http://localhost:5000](http://localhost:5000)

API Docs:
[http://localhost:5000/docs](http://localhost:5000/docs)

---

### 🔹 3. Run Frontend

```bash
npm install
npm run dev
```

Frontend:
[http://localhost:5173](http://localhost:5173)

---

### 🔹 4. Connect Frontend to Backend

Ensure API call points to:

```
http://localhost:5000/generate-deal
```

---

## 🧪 Sample API Request

```json
{
  "bank_name": "Suryoday Small Finance Bank"
}
```

---

## 🏆 Innovation Highlight

Blostem Forge is not a chatbot.

It is:

> **An AI-powered deal generation engine that converts regulatory signals into enterprise sales intelligence.**

---

## 📈 Future Scope

* Real RBI data integration
* CRM integrations (Salesforce, Zoho)
* Multi-agent AI (LangChain / CrewAI)
* Automated outreach generation

---

## 👩‍💻 Author

**Sakshi Sayajirao Chikhale**


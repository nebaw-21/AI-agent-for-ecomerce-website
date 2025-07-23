# AI E-Commerce Assistant

A full-stack AI-powered e-commerce assistant platform, featuring a modern React frontend, Node.js/Express backend, and a Python LangChain microservice with Google Gemini integration. This project demonstrates advanced function calling, tool use, and multi-service orchestration for a smart shopping experience.

---

## 🚀 Technologies Used

- **Frontend:** React (Vite, Redux Toolkit, TailwindCSS)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI Agent:** Python, FastAPI, LangChain, Google Gemini (Generative Language API)
- **Inter-service Communication:** REST APIs
- **Voice Input:** Web Speech API (browser)
- **Environment Management:** dotenv

---

## ✨ Features Implemented

- **Conversational AI Shopping Assistant**
  - Natural language chat with Gemini-powered agent
  - Voice input for hands-free queries
- **Product Management**
  - View all products, check product availability
- **Order Management**
  - Place orders by product name
  - View all orders
  - Delete orders by fuzzy product name

- **Function Calling (Tool Use)**
  - AI agent can call backend APIs as tools to fulfill user requests

---

## 🧠 How Function Calling Works

- The **LangChain agent** (Python) is configured with a set of "tools"—Python functions that wrap REST API calls to the Node.js backend (e.g., get all products, create order, etc).
- When a user asks a question, the agent decides (using Gemini) whether to answer directly or call one or more tools.
- Tool results are returned to Gemini, which incorporates them into its response.
- This enables the AI to take real actions (like placing orders) and provide up-to-date information.

**Example:**
```
User: Order a laptop
→ Gemini decides to call the `order_by_name` tool
→ Tool calls POST /order/by-name on Node backend
→ Result is returned to Gemini and shown to the user
```

---

## 🏗️ Architecture Overview

The system is composed of three main layers:

---

**1. Frontend (React + Redux + TailwindCSS)**
- User interacts via chat, product/order UIs, and voice input.
- Sends REST API requests to the Node.js backend.

**2. Backend (Node.js + Express + MongoDB)**
- Handles all product, order, shipping, and log APIs.
- Persists data in MongoDB.
- Proxies chat requests to the Python AI agent.

**3. Python AI Agent (FastAPI + LangChain + Gemini)**
- Receives chat requests from the backend.
- Uses LangChain with Gemini for reasoning and function calling.
- Calls backend APIs as tools to fulfill user requests (e.g., place order, get products).

---

**Data & Request Flow:**

1. **User** interacts with the React app (chat, product/order actions, voice input).
2. **Frontend** sends REST API requests to the Node.js backend.
3. **Backend** handles business logic, database operations, and forwards chat to the Python AI agent.
4. **Python AI Agent** uses Gemini to understand the request, may call backend APIs as tools, and returns a response.
5. **Backend** returns the AI response to the frontend, which displays it to the user.

---

**Component Diagram:**

Frontend (React) ⇄ Backend (Node.js/Express) ⇄ Python AI Agent (FastAPI/LangChain/Gemini)

---

## 🛠️ Setup & Run

1. **Clone the repo**
2. **Install dependencies**
   - Backend: `cd Backend && npm install`
   - Frontend: `cd Frontend && npm install`
   - Langchain: `cd Langchain && pip install -r requirements.txt`
3. **Set up environment variables** (`.env` files for API keys, DB URIs)
4. **Start services**
   - MongoDB (cloud/local)
   - Backend: `npm run dev`
   - Langchain: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - Frontend: `npm run dev`

---

## 📚 More
- **Function calling** is implemented via LangChain tools in `Langchain/langchain_tools.py`.
- **Gemini model** is set in `Langchain/agent_builder.py`.
- **API endpoints** are in `Backend/src/routes/` and `Backend/src/controllers/`.
- **Frontend chat logic** is in `Frontend/src/components/Chat.jsx` and Redux slices.

---

> Built for modern, AI-driven e-commerce experiences. Easily extensible for new tools, APIs, or LLMs!

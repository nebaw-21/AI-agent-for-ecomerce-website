from fastapi import FastAPI
from pydantic import BaseModel
from agent_builder import agent

app = FastAPI()

class ChatInput(BaseModel):
    user_id: str
    message: str

@app.post("/chat")
def chat(chat: ChatInput):
    result = agent.run(chat.message)
    return {"response": result}

@app.get("/health")
def health():
    return {"status": "Langchain API running"}

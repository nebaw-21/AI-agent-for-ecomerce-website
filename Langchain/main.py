from fastapi import FastAPI
from pydantic import BaseModel
from agent_builder import agent

app = FastAPI()

class ChatInput(BaseModel):
    message: str

@app.post("/chat")
def chat(chat: ChatInput):
    if not chat.message or not chat.message.strip():
        return {"response": "Please enter a message."}
    result = agent.run(chat.message)
    return {"response": result}

@app.get("/health")
def health():
    return {"status": "Langchain API running"}

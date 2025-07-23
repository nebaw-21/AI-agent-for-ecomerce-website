import os
import google.generativeai as genai

# Load your API key from environment or paste it directly
api_key = os.getenv("GOOGLE_API_KEY", "AIzaSyA7r09SowjgJsmP_N6SeUfvXOul8X0QoB4")
genai.configure(api_key=api_key)

print("Available models for your API key:")
for m in genai.list_models():
    print(m.name)

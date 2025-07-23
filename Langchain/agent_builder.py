from dotenv import load_dotenv
load_dotenv()

from langchain.agents import initialize_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents.agent_types import AgentType
from langchain.memory import ConversationBufferMemory
import langchain_tools

llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

# Register all tools from langchain_tools
TOOLS = [
    langchain_tools.get_order_status,
    langchain_tools.get_shipping_status,
    langchain_tools.get_product_availability,
    langchain_tools.create_order,
    langchain_tools.get_all_orders,
    langchain_tools.order_by_name_and_price_range,
    langchain_tools.delete_order_by_name_fuzzy,
    langchain_tools.create_shipping,
    langchain_tools.get_all_products,
    langchain_tools.create_log,
    langchain_tools.get_logs_by_user,
]

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

agent = initialize_agent(
    tools=TOOLS,
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    memory=memory,
    verbose=True,
)

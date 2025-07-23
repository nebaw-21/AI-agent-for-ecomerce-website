from langchain.agents import tool
import requests

NODE_BACKEND_URL = "http://localhost:3000"

@tool
def get_order_status(order_id: str) -> str:
    """Get status of an order by ID."""
    res = requests.get(f"{NODE_BACKEND_URL}/order/{order_id}")
    if res.status_code != 200:
        return "Order not found."
    data = res.json()
    order = data.get("order")
    if not order:
        return "Order not found."
    return f"Order Status: {order.get('status', 'Unknown')}"

@tool
def get_shipping_status(order_id: str) -> str:
    """Get shipping status using an order ID."""
    res = requests.get(f"{NODE_BACKEND_URL}/shipping/{order_id}")
    if res.status_code != 200:
        return "Shipping info not found."
    data = res.json()
    shipping = data.get("shipping")
    if not shipping:
        return "Shipping info not found."
    return f"Shipping Status: {shipping.get('status', 'Unknown')}"

@tool
def get_product_availability(product_name: str) -> str:
    """Check product availability by name."""
    res = requests.get(f"{NODE_BACKEND_URL}/product/name/{product_name}")
    if res.status_code != 200:
        return f"{product_name}: Product not found."
    data = res.json()
    available = data.get('available', False)
    stock = data.get('stock', 0)
    return f"{product_name}: {'In Stock ✅' if available else 'Out of Stock ❌'} (Stock: {stock})"

@tool
def create_order(product_name: str, user_id: str, image_url: str = None) -> str:
    """Create a new order."""
    payload = {"product_name": product_name, "user_id": user_id}
    if image_url:
        payload["image_url"] = image_url
    res = requests.post(f"{NODE_BACKEND_URL}/order", json=payload)
    if res.status_code != 200:
        return "Failed to create order."
    return f"Order created: {res.json().get('order', {})}"

@tool
def get_all_orders() -> str:
    """Get all orders."""
    res = requests.get(f"{NODE_BACKEND_URL}/order")
    if res.status_code != 200:
        return "Failed to fetch orders."
    return str(res.json().get('orders', []))

@tool
def order_by_name_and_price_range(name: str, user_id: str, minPrice: float = None, maxPrice: float = None) -> str:
    """Order product by name and price range."""
    payload = {"name": name, "user_id": user_id}
    if minPrice is not None:
        payload["minPrice"] = minPrice
    if maxPrice is not None:
        payload["maxPrice"] = maxPrice
    res = requests.post(f"{NODE_BACKEND_URL}/order/fuzzy", json=payload)
    if res.status_code != 200:
        return "No product found matching criteria."
    return f"Order created: {res.json().get('order', {})}"

@tool
def delete_order_by_name_fuzzy(name: str) -> str:
    """Delete orders by fuzzy product name match."""
    res = requests.delete(f"{NODE_BACKEND_URL}/order/delete-by-name/{name}")
    if res.status_code != 200:
        return "Failed to delete orders."
    return f"Deleted orders: {res.json().get('deletedCount', 0)}"

@tool
def create_shipping(tracking_id: str, status: str, order_id: str) -> str:
    """Create a new shipping entry."""
    payload = {"tracking_id": tracking_id, "status": status, "order_id": order_id}
    res = requests.post(f"{NODE_BACKEND_URL}/shipping", json=payload)
    if res.status_code != 200:
        return "Failed to create shipping."
    return f"Shipping created: {res.json().get('shipping', {})}"

@tool
def get_all_products() -> str:
    """Get all products."""
    res = requests.get(f"{NODE_BACKEND_URL}/product/")
    if res.status_code != 200:
        return "Failed to fetch products."
    return str(res.json().get('products', []))

@tool
def create_log(user_id: str, query: str, response: str) -> str:
    """Create a log entry."""
    payload = {"user_id": user_id, "query": query, "response": response}
    res = requests.post(f"{NODE_BACKEND_URL}/log", json=payload)
    if res.status_code != 200:
        return "Failed to create log."
    return "Log created."

@tool
def get_logs_by_user(user_id: str) -> str:
    """Get logs by user ID."""
    res = requests.get(f"{NODE_BACKEND_URL}/log/{user_id}")
    if res.status_code != 200:
        return "Failed to fetch logs."
    return str(res.json().get('logs', []))

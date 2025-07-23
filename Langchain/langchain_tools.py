from langchain.agents import tool
import requests
import json

NODE_BACKEND_URL = "http://localhost:5000"

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
    status = order.get('status', 'Unknown')
    if not status:
        return "Order status unavailable."
    return f"Order Status: {status}"



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
def create_order(product_name: str) -> str:
    """Create a new order."""
    payload = {"product_name": product_name}
    res = requests.post(f"{NODE_BACKEND_URL}/order", json=payload)
    if res.status_code != 200:
        return "Failed to create order."
    order = res.json().get('order', {})
    if not order:
        return "Order creation failed."
    return f"Order created: {order}"

@tool
def get_all_orders() -> str:
    """Get all orders."""
    res = requests.get(f"{NODE_BACKEND_URL}/order")
    if res.status_code != 200:
        return "Failed to fetch orders."
    orders = res.json().get('orders', [])
    if not orders:
        return "No orders found."
    # Format orders as readable text
    return "\n".join(
        f"Order ID: {o.get('order_id', '')}, Product: {o.get('product_name', '')}, Status: {o.get('status', '')}"
        for o in orders
    )

@tool
def order_by_name(name: str) -> str:
    """Order product by name."""
    payload = {"name": name}
    res = requests.post(f"{NODE_BACKEND_URL}/order/fuzzy", json=payload)
    if res.status_code != 200:
        return "No product found matching criteria."
    order = res.json().get('order', {})
    if not order:
        return "No product found matching criteria."
    return f"Order created: {order}"

@tool
def delete_order_by_name_fuzzy(name: str) -> str:
    """Delete orders by fuzzy product name match."""
    res = requests.delete(f"{NODE_BACKEND_URL}/order/delete-by-name/{name}")
    if res.status_code != 200:
        return "Failed to delete orders."
    deleted = res.json().get('deletedCount', 0)
    if not deleted:
        return "No orders deleted."
    return f"Deleted orders: {deleted}"



@tool
def get_all_products() -> str:
    """Get all products."""
    res = requests.get(f"{NODE_BACKEND_URL}/product/")
    if res.status_code != 200:
        return "Failed to fetch products."
    products = res.json().get('products', [])
    if not products:
        return "No products found."
    # Format products as readable text
    return "\n".join(
        f"Product: {p.get('product_name', '')}, Price: {p.get('price', 'N/A')}, Stock: {p.get('stock', 0)}, Available: {'Yes' if p.get('available', False) else 'No'}"
        for p in products
    )





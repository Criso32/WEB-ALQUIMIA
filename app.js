document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("order-form");
    const orderItems = document.getElementById("order-items");
    const orderDetails = document.getElementById("order-details");
    const orderList = document.getElementById("order-list");
    const orderTotal = document.getElementById("order-total");
  
    let orders = [];
  
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  
    function addOrder() {
      const customerName = document.getElementById("customer-name").value;
      const selectedItems = Array.from(orderItems.selectedOptions);
      const details = orderDetails.value;
  
      if (customerName && selectedItems.length > 0) {
        const order = {
          customer: customerName,
          items: selectedItems.map(item => item.text),
          total: selectedItems.reduce((total, item) => total + parseInt(item.value), 0),
          details: details
        };
  
        orders.push(order);
        updateOrderList();
        resetForm();
      } else {
        alert("Por favor, complete el nombre del cliente y seleccione al menos un producto.");
      }
    }
  
    function updateOrderList() {
      orderList.innerHTML = "";
      orders.forEach(order => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${order.customer}</strong>: ${order.items.join(", ")} - Detalles: ${order.details} - Total: $${order.total}`;
        orderList.appendChild(listItem);
      });
  
      updateOrderTotal();
    }
  
    function updateOrderTotal() {
      const total = orders.reduce((acc, order) => acc + order.total, 0);
      orderTotal.value = `$${total}`;
    }
  
    function resetForm() {
      orderForm.reset();
      orderItems.selectedIndex = -1;
      orderDetails.value = "";
    }
  
    window.addOrder = addOrder; // Expose the addOrder function for testing purposes
  });
  

const db = require("../config/db.config");

const Order = {
  create: (orderData) => {
    const query =
      "INSERT INTO orders (user_id, delivery_id, status, order_date, delivery_date, pickup_address, delivery_address, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    return db.execute(query, [
      orderData.user_id,
      orderData.delivery_id,
      orderData.status,
      orderData.order_date,
      orderData.delivery_date,
      orderData.pickup_address,
      orderData.delivery_address,
      orderData.price,
    ]);
  },

  findById: (orderId) => {
    const query = "SELECT * FROM orders WHERE order_id = ?";
    return db.execute(query, [orderId]);
  },

  findAll: () => {
    const query = "SELECT * FROM orders";
    return db.execute(query);
  },

  update: (orderId, orderData) => {
    const query =
      "UPDATE orders SET user_id = ?, delivery_id = ?, status = ?, order_date = ?, delivery_date = ?, pickup_address = ?, delivery_address = ?, price = ? WHERE order_id = ?";
    return db.execute(query, [
      orderData.user_id,
      orderData.delivery_id,
      orderData.status,
      orderData.order_date,
      orderData.delivery_date,
      orderData.pickup_address,
      orderData.delivery_address,
      orderData.price,
      orderId,
    ]);
  },

  delete: (orderId) => {
    const query = "DELETE FROM orders WHERE order_id = ?";
    return db.execute(query, [orderId]);
  },
};

module.exports = Order;

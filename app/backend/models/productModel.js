const db = require("../config/db.config");

const Product = {
  create: (productData) => {
    const query =
      "INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)";
    return db.execute(query, [
      productData.name,
      productData.description,
      productData.price,
      productData.category_id,
    ]);
  },

  findById: (productId) => {
    const query = "SELECT * FROM products WHERE product_id = ?";
    return db.execute(query, [productId]);
  },

  findAll: () => {
    const query = "SELECT * FROM products";
    return db.execute(query);
  },

  update: (productId, productData) => {
    const query =
      "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE product_id = ?";
    return db.execute(query, [
      productData.name,
      productData.description,
      productData.price,
      productData.category_id,
      productId,
    ]);
  },

  delete: (productId) => {
    const query = "DELETE FROM products WHERE product_id = ?";
    return db.execute(query, [productId]);
  },
};

module.exports = Product;

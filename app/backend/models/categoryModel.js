const db = require("../config/db.config");

const Category = {
  create: (categoryData) => {
    const query = "INSERT INTO categories (name, description) VALUES (?, ?)";
    return db.execute(query, [categoryData.name, categoryData.description]);
  },

  findById: (categoryId) => {
    const query = "SELECT * FROM categories WHERE category_id = ?";
    return db.execute(query, [categoryId]);
  },

  findAll: () => {
    const query = "SELECT * FROM categories";
    return db.execute(query);
  },

  update: (categoryId, categoryData) => {
    const query =
      "UPDATE categories SET name = ?, description = ? WHERE category_id = ?";
    return db.execute(query, [
      categoryData.name,
      categoryData.description,
      categoryId,
    ]);
  },

  delete: (categoryId) => {
    const query = "DELETE FROM categories WHERE category_id = ?";
    return db.execute(query, [categoryId]);
  },
};

module.exports = Category;

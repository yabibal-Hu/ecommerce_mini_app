const db = require("../config/db.config");

const User = {
  create: (userData) => {
    const query =
      "INSERT INTO users (username, first_name, last_name, phone_number, role, password_hash, telegram_id, preferred_language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    return db.execute(query, [
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.phone_number,
      userData.role,
      userData.password_hash,
      userData.telegram_id,
      userData.preferred_language,
    ]);
  },

  findById: (userId) => {
    const query = "SELECT * FROM users WHERE user_id = ?";
    return db.execute(query, [userId]);
  },

  findAll: () => {
    const query = "SELECT * FROM users";
    return db.execute(query);
  },

  update: (userId, userData) => {
    const query =
      "UPDATE users SET username = ?, first_name = ?, last_name = ?, phone_number = ?, role = ?, password_hash = ?, telegram_id = ?, preferred_language = ? WHERE user_id = ?";
    return db.execute(query, [
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.phone_number,
      userData.role,
      userData.password_hash,
      userData.telegram_id,
      userData.preferred_language,
      userId,
    ]);
  },

  delete: (userId) => {
    const query = "DELETE FROM users WHERE user_id = ?";
    return db.execute(query, [userId]);
  },
};

module.exports = User;

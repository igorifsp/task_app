require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

const db = require("../dbConfig");

module.exports = {
  getUserByEmailAndPassword: async (email, password) => {
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [email, password], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const { email, favoriteActivity, username } = results[0];
            resolve({ email, favoriteActivity, username });
          }
        }
      });
    });
  },

  createUser: async (userData) => {
    const { email, password, favoriteActivity, username } = userData;
    const query =
      "INSERT INTO users (email, password, favoriteActivity, username) VALUES (?, ?, ?, ?)";
    const values = [email, password, favoriteActivity, username];
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ email, favoriteActivity, username });
        }
      });
    });
  },

  getUser: async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const { email, password, favoriteActivity, username } = results[0];
            resolve({ email, password, favoriteActivity, username });
          }
        }
      });
    });
  },

  getAllUsers: async () => {
    const query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateUser: async (email, userData) => {
    const { password, favoriteActivity, username } = userData;
    const query =
      "UPDATE users SET password = ?, favoriteActivity = ?, username = ? WHERE email = ?";
    const values = [password, favoriteActivity, username, email];
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows === 0) {
            resolve(null);
          } else {
            resolve({ email, favoriteActivity, username });
          }
        }
      });
    });
  },

  deleteUser: async (email) => {
    const query = "DELETE FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows === 0) {
            resolve(null);
          } else {
            resolve({ email });
          }
        }
      });
    });
  },
};

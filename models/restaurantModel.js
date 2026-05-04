const db = require('../db');

const getAllRestaurants = async () => {
  const [rows] = await db.query('SELECT * FROM RESTAURANTES');
  return rows;
};

const getRestaurantById = async (id) => {
  const [rows] = await db.query('SELECT * FROM RESTAURANTES WHERE id_restaurante = ?', [id]);
  return rows[0];
};

const createRestaurant = async (restaurantData) => {
  const { nombre, direccion } = restaurantData;
  const [result] = await db.query('INSERT INTO RESTAURANTES (nombre, direccion) VALUES (?, ?)', [nombre, direccion]);
  return result;
};

const updateRestaurant = async (id, restaurantData) => {
  const { nombre, direccion } = restaurantData;
  const [result] = await db.query('UPDATE RESTAURANTES SET nombre = ?, direccion = ? WHERE id_restaurante = ?', [nombre, direccion, id]);
  return result;
};

const deleteRestaurant = async (id) => {
    await db.query('DELETE FROM PLATOS WHERE id_restaurante = ?', [id]);
  const [result] = await db.query('DELETE FROM RESTAURANTES WHERE id_restaurante = ?', [id]);
  return result;
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};
const db = require('../db');

const getDishesByRestaurant = async (restaurantId) => {
  const sql = `
    SELECT PLATOS.*, RESTAURANTES.nombre AS nombre_restaurante
    FROM PLATOS
    JOIN RESTAURANTES ON PLATOS.id_restaurante = RESTAURANTES.id_restaurante
    WHERE PLATOS.id_restaurante = ?;
  `;
  const [rows] = await db.query(sql, [restaurantId]);
  return rows;
};

const getDishById = async (id) => {
  const [rows] = await db.query('SELECT * FROM PLATOS WHERE id_plato = ?', [id]);
  return rows[0];
};

const createDish = async (dishData, imageName) => {
  const { nombre, precio, id_restaurante } = dishData;
  const sql = 'INSERT INTO PLATOS (nombre, precio, imagen, id_restaurante) VALUES (?, ?, ?, ?)';
  const [result] = await db.query(sql, [nombre, precio, imageName, id_restaurante]);
  return result;
};

const updateDish = async (id, dishData, imageName) => {
  const { nombre, precio, id_restaurante } = dishData;
  
  let sql = 'UPDATE PLATOS SET nombre = ?, precio = ?, id_restaurante = ? WHERE id_plato = ?';
  let params = [nombre, precio, id_restaurante, id];

  if (imageName) {
    sql = 'UPDATE PLATOS SET nombre = ?, precio = ?, imagen = ?, id_restaurante = ? WHERE id_plato = ?';
    params = [nombre, precio, imageName, id_restaurante, id];
  }

  const [result] = await db.query(sql, params);
  return result;
};

const deleteDish = async (id) => {
  const [result] = await db.query('DELETE FROM PLATOS WHERE id_plato = ?', [id]);
  return result;
};

module.exports = {
  getDishesByRestaurant,
  getDishById,
  createDish,
  updateDish,
  deleteDish
};
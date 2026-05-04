const restaurantModel = require('../models/restaurantModel');

exports.showRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.getAllRestaurants();
    res.render('index', { restaurants: restaurants, title: 'Lista de Restaurantes' });
  } catch (err) {
    res.status(500).send('Error del servidor: ' + err.message);
  }
};

exports.showAddForm = (req, res) => {
  res.render('restaurantForm', { restaurant: null, title: 'Añadir Restaurante', mode: 'add' });
};

exports.createRestaurant = async (req, res) => {
  const { nombre, direccion } = req.body;
  if (!nombre || !direccion) {
    return res.status(400).send('Nombre y dirección son obligatorios.');
  }

  try {
    await restaurantModel.createRestaurant(req.body);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error al crear restaurante: ' + err.message);
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const restaurant = await restaurantModel.getRestaurantById(req.params.id);
    if (!restaurant) return res.status(404).send('Restaurante no encontrado.');
    res.render('restaurantForm', { restaurant: restaurant, title: 'Editar Restaurante', mode: 'edit' });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.updateRestaurant = async (req, res) => {
  const { nombre, direccion } = req.body;
  if (!nombre || !direccion) {
    return res.status(400).send('Nombre y dirección son obligatorios.');
  }

  try {
    await restaurantModel.updateRestaurant(req.params.id, req.body);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error al actualizar restaurante: ' + err.message);
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    await restaurantModel.deleteRestaurant(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error al eliminar restaurante: ' + err.message);
  }
};
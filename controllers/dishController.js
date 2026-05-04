const dishModel = require('../models/dishModel');
const restaurantModel = require('../models/restaurantModel');
const path = require('path');
const fs = require('fs'); 

exports.showDishesForRestaurant = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const dishes = await dishModel.getDishesByRestaurant(restaurantId);
    const restaurant = await restaurantModel.getRestaurantById(restaurantId);

    if (!restaurant) return res.status(404).send('Restaurante no encontrado.');

    res.render('dishes', { 
      dishes: dishes, 
      restaurant: restaurant, 
      title: `Platos de ${restaurant.nombre}` 
    });
  } catch (err) {
    res.status(500).send('Error del servidor: ' + err.message);
  }
};

exports.showAddForm = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await restaurantModel.getRestaurantById(restaurantId);
    if (!restaurant) return res.status(404).send('Restaurante no encontrado.');
    res.render('dishForm', { dish: null, restaurant: restaurant, title: 'Añadir Plato', mode: 'add' });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.createDish = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).send('Nombre y precio son obligatorios.');
  }

  const imageName = req.file ? req.file.filename : null;

  try {
    await dishModel.createDish({ ...req.body, id_restaurante: restaurantId }, imageName);
    res.redirect(`/restaurants/${restaurantId}/dishes`);
  } catch (err) {
    res.status(500).send('Error al crear plato: ' + err.message);
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const dish = await dishModel.getDishById(req.params.id);
    if (!dish) return res.status(404).send('Plato no encontrado.');
    const restaurant = await restaurantModel.getRestaurantById(dish.id_restaurante);
    res.render('dishForm', { dish: dish, restaurant: restaurant, title: 'Editar Plato', mode: 'edit' });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};

exports.updateDish = async (req, res) => {
  const dishId = req.params.id;
  const { nombre, precio, id_restaurante } = req.body;

  if (!nombre || !precio) {
    return res.status(400).send('Nombre y precio son obligatorios.');
  }

  const newImageName = req.file ? req.file.filename : null;

  try {
    await dishModel.updateDish(dishId, req.body, newImageName);
    res.redirect(`/restaurants/${id_restaurante}/dishes`);
  } catch (err) {
    res.status(500).send('Error al actualizar plato: ' + err.message);
  }
};

exports.deleteDish = async (req, res) => {
  const dishId = req.params.id;
  try {
    const dish = await dishModel.getDishById(dishId);
    if (!dish) return res.status(404).send('Plato no encontrado.');
    const restaurantId = dish.id_restaurante;

    if (dish.imagen) {
        const imagePath = path.join(__dirname, '../public/uploads', dish.imagen);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    await dishModel.deleteDish(dishId);
    res.redirect(`/restaurants/${restaurantId}/dishes`);
  } catch (err) {
    res.status(500).send('Error al eliminar plato: ' + err.message);
  }
};
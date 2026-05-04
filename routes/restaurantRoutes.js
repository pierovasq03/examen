const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.showRestaurants);

router.get('/add', restaurantController.showAddForm);
router.post('/add', restaurantController.createRestaurant);

router.get('/edit/:id', restaurantController.showEditForm);
router.post('/update/:id', restaurantController.updateRestaurant);

router.get('/delete/:id', restaurantController.deleteRestaurant);

module.exports = router;
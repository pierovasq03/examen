const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const upload = require('../middleware/uploadMiddleware');

router.get('/restaurants/:restaurantId/dishes', dishController.showDishesForRestaurant);
router.get('/restaurants/:restaurantId/dishes/add', dishController.showAddForm);
router.post('/restaurants/:restaurantId/dishes/add', upload.single('imagen'), dishController.createDish);

router.get('/dishes/edit/:id', dishController.showEditForm);
router.post('/dishes/update/:id', upload.single('imagen'), dishController.updateDish);
router.get('/dishes/delete/:id', dishController.deleteDish);

module.exports = router;
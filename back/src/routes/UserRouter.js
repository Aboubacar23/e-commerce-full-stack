const expres = require('express');
const router = expres.Router();

const userController = require('../controllers/UserController');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);


module.exports = router;
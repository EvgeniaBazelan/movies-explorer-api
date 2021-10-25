const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateSigIn, validateSigUp } = require('../middlewares/Validation');
const { login, createUser } = require('../controllers/users');

router.post('/signup', validateSigUp, createUser);
router.post('/signin', validateSigIn, login);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

module.exports = router;

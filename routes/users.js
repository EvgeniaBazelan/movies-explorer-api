const router = require('express').Router();

// const { getUserId } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const {
  validateUser,
  // validateId,
} = require('../middlewares/Validation');

router.get('/me', getUser);
router.patch('/me', validateUser, updateUser);
// router.get('/:id', validateId, getUserId);

module.exports = router;

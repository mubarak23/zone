const express = require('express');
const {
  registerUser,
  findUserById,
  findUserProfile,
  deleteUser,
  createUser
} = require('../controllers/user');

const { requireSignin, hasAuthorization } = require('../controllers/auth');

const router = express.Router();
router.route('/api/user').post(createUser);
router
  .route('api/users/:userId')
  .get(findUserProfile)
  .delete(requireSignin, hasAuthorization, deleteUser);

router.param('userId', findUserById);

module.exports = router;

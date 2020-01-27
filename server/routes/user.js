const express = require('express');
const {
  registerUser,
  findUserById,
  findUserProfile,
  deleteUser,
  findUserWithId,
  createUser
} = require('../controllers/user');

const { requireSignin, hasAuthorization } = require('../controllers/auth');

const router = express.Router();
router.route('/api/user').post(createUser);
router
  .route('/api/user/:userId')
  .get(findUserWithId)
  .delete(requireSignin, hasAuthorization, deleteUser);

router.param('userId', findUserById);

module.exports = router;

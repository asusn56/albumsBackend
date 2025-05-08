const express = require('express')
const { register, login, updateUser ,getUsers,getUserById,deleteUser} = require('../controllers/userController')
// const authMiddleware = require('../middlewares/authMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/update', authMiddleware, updateUser)
router.get("/", getUsers);
// router.get("/current", getCurrentUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router
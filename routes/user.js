const { Router } = require('express');
const { login, signUp } = require('../controllers/users')

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/signUp', signUp)

module.exports = userRouter;
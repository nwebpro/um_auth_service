import express from 'express'
import UsersController from './Users.controller'

const router = express.Router()

router.post('/create-user', UsersController.createUser)

export default router

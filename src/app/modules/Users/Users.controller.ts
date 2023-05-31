import { Request, Response } from 'express'
import UsersService from './Users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await UsersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUser,
}

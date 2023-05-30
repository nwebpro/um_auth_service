import config from '../../../config/index'
import { IUser } from './Users.interface'
import { User } from './Users.model'
import { generateUserId } from './Users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Automatic generated incremental id create korte hobe
  const id = await generateUserId()
  user.id = id
  // default password set korte hobe
  if (!user.password) {
    user.password = config.default_user_password as string // default password set in .env file
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Field to creating user')
  }
  return createdUser
}

export default {
  createUser,
}

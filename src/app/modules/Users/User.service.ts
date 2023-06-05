import config from "../../../config/index";
import ApiError from "../../../errors/ApiErrors";
import { IUser } from "./User.interface";
import { User } from "./User.model";
import { generateUserId } from "./User.utils";

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Automatic generated incremental id create korte hobe
  const id = await generateUserId();
  user.id = id;
  // default password set korte hobe
  if (!user.password) {
    user.password = config.default_user_password as string; // default password set in .env file
  }

  const createdUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, "Field to creating user");
  }
  return createdUser;
};

export const UserService = {
  createUser,
};

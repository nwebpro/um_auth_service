import { User } from './User.model';

// Get last user id from database
export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id;
};

// Generate user id
export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  // increment id by 1
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementId;
};

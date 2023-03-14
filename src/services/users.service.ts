import { AppDataSource } from "../data-source";
import { User } from "../entities";
import {
  iUserRepo,
  iUserRequest,
  iUserResponse,
  iUsersResponse,
  iUserUpdateRequest,
} from "../interfaces";
import { userResponseSchema, usersResponseSchema } from "../schemas";

const create = async (userData: iUserRequest): Promise<iUserResponse> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const newUser = await userRepo.save(userRepo.create(userData));

  return userResponseSchema.parse(newUser);
};


const read = async (): Promise<iUsersResponse> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);

  return usersResponseSchema.parse(await userRepo.find());
};


const update = async (id: number, userInfos: iUserUpdateRequest): Promise<iUserResponse> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const oldUser: User | null = await userRepo.findOneBy({ id: id });
  const updatedUser: User = userRepo.create({ ...oldUser, ...userInfos });

  return userResponseSchema.parse(await userRepo.save(updatedUser));
};


const remove = async (id: number): Promise<void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  
  await userRepo.softRemove({id: id})
};

export default {create, read, remove, update }

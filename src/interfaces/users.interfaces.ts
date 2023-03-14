import {
  userSchema,
  userCreateSchema,
  userResponseSchema,
  usersResponseSchema,
} from "../schemas";
import { z } from "zod";
import { User } from "../entities";
import { DeepPartial, Repository } from "typeorm";

export type iUser = z.infer<typeof userSchema>;
export type iUserRequest = z.infer<typeof userCreateSchema>;
export type iUserUpdateRequest = DeepPartial<iUserRequest>;
export type iUserResponse = z.infer<typeof userResponseSchema>;
export type iUsersResponse = z.infer<typeof usersResponseSchema>;
export type iUserRepo = Repository<User>;

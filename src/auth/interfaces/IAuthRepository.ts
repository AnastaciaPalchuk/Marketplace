import { InsertResult, UpdateResult } from "typeorm";
import { User } from "../userEntity";

export const AuthRepositoryToken = Symbol("AuthRepositoryToken");

export interface IAuthRepository {
  findUserByEmail: (userEmail: string) => Promise<User | null>;
  createNewUser: (
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string
  ) => Promise<InsertResult>;
  changeEmailIsVerified: (user_id: number) => Promise<UpdateResult>;
  changePassword: (id: number, password: string) => Promise<UpdateResult>;
  findUserById: (id: number) => Promise<User | null>;
}

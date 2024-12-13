import { UserModel } from "../UserModel";

export const AuthRepositoryToken = Symbol("AuthRepositoryToken");

export interface IAuthRepository {
  findUserByEmail: (userEmail: string) => Promise<UserModel | null>;
  createNewUser: (
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string
  ) => Promise<UserModel>;
  changeEmailIsVerified: (user_id: number) => Promise<void>;
  changePassword: (id: number, password: string) => Promise<void>;
  findUserById: (id: number) => Promise<UserModel | null>;
}

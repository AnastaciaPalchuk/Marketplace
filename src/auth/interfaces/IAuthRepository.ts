export const AuthRepositoryToken = Symbol("AuthRepositoryToken");

export interface IAuthRepository {
  findUserByEmail: (
    userEmail: string
  ) => Promise<{ password: string; id: number; access_type: string }>;
  createNewUser: (
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string
  ) => Promise<{id: number, name: string, email: string, surname: string}>;
  isVerified: (user_id: number) => Promise<boolean>;
  changeEmailIsVerified: (user_id: number) => Promise<any>;
  changePassword: (id: number, password: string) => Promise<any>;
  findUserById: (id: number) => Promise<{id: number, name: string, email: string, surname: string}>
}

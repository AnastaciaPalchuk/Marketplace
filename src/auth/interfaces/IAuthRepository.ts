export const AuthRepositoryToken = Symbol("AuthRepositoryToken");

export interface IAuthRepository {
  findUserByEmail: (
    userEmail: string
  ) => Promise<{ password: string; id: number; access_type: string }>;
  createNewUser: (
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string,
    code: number
  ) => Promise<{id: number, name: string, email: string, surname: string}>;
  isVerified: (user_id: number) => Promise<boolean>;
  getCode: (
    user_id: number
  ) => Promise<{
    id: number;
    user_id: number;
    code: number;
    type_of_notice: string;
    expires_at: number;
    created_at: number;
  }>;
  changeEmailIsVerified: (user_id: number) => Promise<any>;
  addCode: (code: number, id: number) => Promise<any>;
  changePassword: (id: number, password: string) => Promise<any>;
  findUserId: (code: number) => Promise<number>;
  addEmailCode: (code: number, user_id: number) => Promise<any>;
  findUserById: (id: number) => Promise<{id: number, name: string, email: string, surname: string}>
}

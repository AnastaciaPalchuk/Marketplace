export const AuthRepositoryToken = Symbol('AuthRepositoryToken');

export interface IAuthRepository{
    findUserByEmail: (userEmail: string) => Promise<{password: string, id: number, access_type: string}>;
    createNewUser: (userName: string, userSurname: string, userEmail: string, userPassword: string) => Promise <any>;
}
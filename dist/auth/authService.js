"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserAlreadyExists_1 = require("./errors/UserAlreadyExists");
const WrongCredentials_1 = require("./errors/WrongCredentials");
const inversify_1 = require("inversify");
const IAuthRepository_1 = require("./interfaces/IAuthRepository");
let AuthService = class AuthService {
    constructor(repository) {
        this.repository = repository;
    }
    createUser(name, surname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield this.repository.findUserByEmail(email);
            let hashpassword = (0, crypto_1.createHash)("sha256").update(password).digest("hex");
            if (findUser) {
                throw new UserAlreadyExists_1.UserAlreadyExists();
            }
            else {
                const user = yield this.repository.createNewUser(name, surname, email, hashpassword);
                return user;
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashpassword = (0, crypto_1.createHash)("sha256").update(password).digest("hex");
            let userLogin = yield this.repository.findUserByEmail(email);
            if (userLogin.password === hashpassword) {
                return {
                    token: jsonwebtoken_1.default.sign({
                        id: userLogin.id,
                        access_type: userLogin.access_type,
                    }, "secret"),
                };
            }
            else {
                throw new WrongCredentials_1.WrongCredentials();
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(IAuthRepository_1.AuthRepositoryToken)),
    __metadata("design:paramtypes", [Object])
], AuthService);

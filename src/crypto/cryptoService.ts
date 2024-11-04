import { createHash, randomInt } from "crypto";
import { injectable } from "inversify";
import jsonwebtoken from "jsonwebtoken";


@injectable()
export class CryptoService{
constructor () {}

async createHash(password: string){
    return createHash("sha256").update(password).digest("hex")
}

async generateCode(){
    return randomInt(100000, 999999);
  }

async jwtSign(id: number, access_type: string, token: string){
    return {
        token: jsonwebtoken.sign(
          {
            id: id,
            access_type: access_type,
          },
          token
        ),
      };
}
}
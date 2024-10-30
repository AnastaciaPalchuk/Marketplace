export class ExpiredCode extends Error{
    constructor(){
        super('Your code is expired, try again!')
    }
}

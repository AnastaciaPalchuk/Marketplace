export class NotFound extends Error{
    constructor(){
        super('Task is not found')
    }
}

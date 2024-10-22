export class NotAvailable extends Error{
    constructor(){
        super('Item is not available')
    }
}
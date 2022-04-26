export default class MissingTokenError extends Error {
    static defaultMessage: string = "Missing token"
    constructor(message: string){
        super(message)
        this.name = "MissingTokenError"

        Object.setPrototypeOf(this, MissingTokenError.prototype)
    }
}
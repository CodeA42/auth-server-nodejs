export default class MissingTokenError extends Error {
    constructor(message: string = "Missing Token"){
        super(message)
        this.name = "MissingTokenError"
    }
}
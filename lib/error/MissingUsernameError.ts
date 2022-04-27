export default class MissingUsernameError extends Error {
    constructor(message: string = "Missing username"){
        super(message)
        this.name = "MissingUsernameError"
    }
}
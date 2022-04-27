export default class MissingUsernameError extends Error {
    static defaultMessage: string = "Missing username"
    constructor(message: string){
        super(message)
        this.name = "MissingUsernameError"
    }
}
export default class MissingEmailError extends Error {
    constructor(message: string = "Missing email"){
        super(message)
        this.name = "MissingEmailError"
    }
}
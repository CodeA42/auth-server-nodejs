export default class MissingEmailError extends Error {
    static defaultMessage: string = "Missing email"
    constructor(message: string){
        super(message)
        this.name = "MissingEmailError"
    }
}
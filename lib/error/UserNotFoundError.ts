export default class UserNotFoundError extends Error {
    static defaultMessage: string = "User not found"
    constructor(message: string){
        super(message)
        this.name = "UserNotFoundError"

        Object.setPrototypeOf(this, UserNotFoundError.prototype)
    }
}
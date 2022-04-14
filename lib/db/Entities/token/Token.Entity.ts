import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class Token {

    
    id: number

    @PrimaryColumn({
        type: "text",
        unique: true
    })
    token: string

    @Column()
    exp: number

    @Column({
        length: 24
    })
    username: string

    @Column({
        type: "text"
    })
    userAgent: string
}
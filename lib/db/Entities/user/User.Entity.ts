import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 24,
        unique: true
    })
    username: string

    @Column({
        length: 64
    })
    password: string

    @Column({
        length: 100,
        unique: true
    })
    email: string
}
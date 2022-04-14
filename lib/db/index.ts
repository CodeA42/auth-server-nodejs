import { DataSource } from "typeorm";
import Token from "./Entities/token/Token.Entity";
import User from "./Entities/user/User.Entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "nodejsapi",
    password: "supersecret",
    database: "databaseforoperationsofentirenations",
    entities:[User, Token],
    synchronize: true
});

AppDataSource.initialize().catch((e) => console.error(e));
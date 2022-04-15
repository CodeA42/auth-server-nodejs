import { DataSource } from "typeorm";
import Token from "./Entities/token/Token.Entity";
import User from "./Entities/user/User.Entity";
import adminDoesNotExist from "./queries/user/admin";
import { createAdmin } from "./queries/user/admin/create";

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

AppDataSource.initialize().then(async () => {
    try{
        if(await adminDoesNotExist()){
            console.log('No admin');
            await createAdmin();
            console.log('Admin created');
        }
    } catch(e) {
        console.error(e);
    }

    console.log(`Db init success`);
}).catch((e) => console.error(e));
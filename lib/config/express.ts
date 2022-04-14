import * as express from "express";
import * as cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

function configExpress(app){
    app.use(express.json())
    app.use(cookieParser())

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
}

export {
    configExpress
}
import express from "express";
import homeController from "../controllers/homeController";




let router = express.Router();



let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/kethao', (req, res)=> {
        return res.send("Hello Word with KetHao1")
    });





    return app.use("/", router);

}

module.exports = initWebRoutes

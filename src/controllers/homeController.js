




import res from 'express/lib/response';
import db from '../models/index';
import CURDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();

        return res.render('homepage.ejs',{
            data:JSON.stringify(data)
        });

    }catch(e){
        console.log(e)
    }
    


}


let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let displayGetCRUD = async(req, res) => {
    let data = await CURDservice.getAllUser();
    console.log('-------------------')
    console.log(data)
    console.log('-------------------')
    return res.render('displayCRUD.ejs',{
        dataTable: data
    })

}


let postCRUD = async(req, res) => {
    let message =  await CURDservice.createNewUser(req.body)
    console.log(message)
    return res.send('post crud');
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD, 
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,

}
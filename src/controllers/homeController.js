




import res from 'express/lib/response';
import db from '../models/index';
import CRUDservice from "../services/CRUDservice";
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
    let data = await CRUDservice.getAllUser();
    console.log('-------------------')
    console.log(data)
    console.log('-------------------')
    return res.render('displayCRUD.ejs',{
        dataTable: data
    })

}


let postCRUD = async(req, res) => {
    let message =  await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('post crud');
}
let getEditCRUD= async(req, res) =>{
    let userId = req.query.id;
    if (userId){
    let userData = await CRUDservice.getUserInforById(userId);
    //check user data not found


    //let userData

    return res.render('editCRUD.ejs',{
        user:userData
    });
    }else{
    return res.send('user not found ');
    }
}

let putCRUD = async(req, res) =>{
    let data  = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable: allUsers
    })

}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD, 
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
}
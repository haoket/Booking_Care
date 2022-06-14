import bcrypt from 'bcryptjs';
import db from '../models/index';



const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPassWordFromBcrypt = await hasUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender==='1'? true: false,
                roleId: data.roleId,

            })
            resolve('oke create a new user')
        }catch(e){
            reject(e);
        }
    })
    
}

let hasUserPassword = (password) => {
    
    
    return new Promise(async(resolve, reject)=> {
    try{
        let hashPassWord = await bcrypt.hashSync(password, salt);
        resolve(hashPassWord);
    }catch(e){
        reject(e);
    }
    
    
    })
}

let getAllUser = () => {
    return new Promise(async(resolve, reject) =>{
        try{
            let users = db.User.findAll({
                raw : true,
            });
            resolve(users)
        }catch(e){
            reject(e);
        }
    })
}

let getUserInforById = (userId) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user  = await db.User.findOne({
                where: {id: userId}, 
                raw: true
            })


            if (user){
                resolve(user)
            }else{
                resolve([])
            }


        } catch (e) {
            reject(e);
        }
    })
}


let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if (user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }

        } catch (e) {
            console.log(e)
            
        }
    })
}


module.exports ={
    createNewUser:createNewUser,
    getAllUser: getAllUser,
    getUserInforById:getUserInforById,
    updateUserData:updateUserData,
}
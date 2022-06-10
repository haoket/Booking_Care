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




module.exports ={
    createNewUser:createNewUser,

}
import mongoose from 'mongoose'

const user =  mongoose.Schema({
        email : {
                type : String,
                required : true
        },
        name : {
                type : String,
                required : true
        },
        lastName : {
                type : String,
                required : true
        },
        mobile : {
                type : String,
                required : true
        },
        password : {
                type : String,
                required : true
        },
 
})

export default mongoose.models.User || mongoose.model('User' , user)
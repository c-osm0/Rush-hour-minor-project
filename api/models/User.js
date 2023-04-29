import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        
    },

    lastname:{
        type: String,
        required: true,
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

    isAdmin:{
        type: Boolean,
        default: false
    },


},
{timestamps: true });

export default mongoose.model("User",UserSchema);
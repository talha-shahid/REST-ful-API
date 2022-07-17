const mongoose = require("mongoose");
const validator = require("validator");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique:[true,"Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
        max:10,
        required:true,
        unique:true
    },
    address: {
        type: String,
        required: true
    }
})

// we will create a new collection

const Student = new mongoose.model('Student', StudentSchema);

module.exports = Student;
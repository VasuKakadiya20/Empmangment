    const mongoose = require('mongoose')

    const employeeSchema = mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        Role :{
            type:String,    
            required:true
        },
        Department :{
            type:String,
            default:null,
        },
        Mobile:{
            type:Number,
            required:true
        },
        JoiningDate :{
            type :String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        Address:{
            type:String,
            required:true
        },
        EmployeeStatus:{
            type:String,
            required:true
        },
          profileImage: {   // ✅ single image string
        type: String,
        default: ""
    },
    })
    
    exports.employee = mongoose.model('employee',employeeSchema) 
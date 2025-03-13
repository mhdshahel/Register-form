
const mongoose=require('mongoose');
const StaffSchema = new mongoose.Schema({
    
    Name:{type:String,required:true},
    Username:{type:String,require:true},
    Password:{type:String,required:true},
    Phone:{type:Number,required:true},
    Email:{type:String,required:true},
    Address:{type:String,required:true},
    Department:{type:String,required:true},
})

const staff=mongoose.model('staff',StaffSchema);
         
               module.exports=staff;
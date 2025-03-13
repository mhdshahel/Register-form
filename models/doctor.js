const mongoose=require('mongoose');
const doctorSchema = new mongoose.Schema({
    
    Name:{type:String,required:true},
    Username:{type:String,require:true},
    Password:{type:String,required:true},
    Phone:{type:Number,required:true},
    Email:{type:String,required:true},
    Address:{type:String,required:true},
    Department:{type:String,required:true},
})


const bookingSchema = new mongoose.Schema({
    
    Name:{type:String,required:true},
    Phone:{type:Number,required:true},
    Address:{type:String,required:true},
    Department:{type:String,required:true},
});

const patientSchema = new mongoose.Schema({
    
    Name:{type:String,required:true},
    Phone:{type:Number,required:true},
    Email:{type:String,required:true},
    Address:{type:String,required:true},
    Department:{type:String,required:true},
})







const  doctor=mongoose.model('doctor',doctorSchema);
const booking=mongoose.model('booking',bookingSchema);
const patient=mongoose.model('patinet',patientSchema);

         
               module.exports={doctor,booking,patient}
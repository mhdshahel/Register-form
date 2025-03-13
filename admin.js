const connection=require('./mongoose_connection');
const express = require('express');
const admin=express.Router()


admin.use(express.json());
admin.use(express.urlencoded({extended: true}));







admin.put('/update', async (req, res) => {
    //updateOne & updateMany, findOneAndUpdate, findByIdAndUpdate
        const result = await staff.updateOne({Name},{ Phone:Phone ,Email:Email,Password:Password });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'No  found with the name'});
        }
        res.status(200).json({ message: ' updated successfull', result });
});






admin.get('/diplay', async (req,res) => {
    const{Name}= req.body
    const user =await staff.find({Name:Name});

    if  (staff.length === 0) {
        return res.status(404).json({ message: 'No  found with the name'});
    }
    res.status(200).json({ message: ' Display  successfully', result });
});




admin.delete('/delete',async (req,res) => {
    const{Name}=req.body;

    const result=-await staff.deleteOne({Name})
    if  (staff.length === 0) {
        return res.status(404).json({ message: 'No  found with the name'});
    }
    res.status(200).json({ message: ' Delete successfully', result });
});
    

                  module.exports=admin;
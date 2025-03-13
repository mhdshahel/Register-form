const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const connection=require('./mongoose_connection');
const session = require('express-session');
const staff=require('./models/staffmodel');
const {doctor,booking,patient}=require('./models/doctor');
const admin = require('./admin')
app.use(express.json());
app.use('/admin',admin)

app.use(express.urlencoded({ extended: true }));


// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day (in milliseconds)
        }
    })
);

app.post('/insert', (req, res) => {
    const { Name, Password, Phone, Email, Address,Department,Username } = req.body;
    const OTP = Math.floor(10000 + Math.random() * 900000);
    console.log(OTP);

    ////Send OTP via email///
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mhdshahel36@gmail.com',
            pass: 'odhe jnop autz wecp',
        }
    });
    console.log(Email);
    
    const message = {
        from: 'mhdshahel36@gmail.com',
        to: Email,
        subject: 'OTP FOR YOUR REGISTRATION',
        text: `YOUR OTP IS ${OTP}`,
    };

    transport.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error sending OTP email:', error);
            return res.status(500).send('Error sending OTP');
        }

        req.session.user = { Name: Name, Password: Password, Phone: Phone, Email: Email, Address: Address, Otp: OTP ,Department:Department, Username:Username };
        console.log(req.session.user);
        res.json({ message: 'OTP sent successfully' });
    });
});

app.post('/otp', async (req, res) => {
    const { OTP } = req.body;

    if (!req.session.user) {
        return res.status(400).send('Session expired or user not found');
    }

    const { Name, Password, Email, Phone, Address, Otp,Department,Username  } = req.session.user;
    console.log(req.session.user);
    console.log(typeof(OTP));
    console.log(typeof(Otp));
    
    
    // Validate OTP
    if (OTP !== Otp) {
        return res.status(400).send('Invalid OTP');
    }
    else{

        const newpatient= new patient({
            Name, Email, Phone,Address,Department
        
        });
        
        await newpatient.save();
          res.send({Message:" registered successfully",patient:newpatient});
        
      
    }

});



  


////////////loging//////////
app.post('/login',async (req, res) => {
    const { Username, Password } = req.body;
    const user = await staff.findOne({Username:"",Password:""});
     if (req.session.userid){
        return res.status(404).json({massage:"error"})
        
     }
     req.session.userid=user.Username;
     res.status(200).json({ message: ' loging successfully', result });
});



/////////////logout///////////////////////////
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            conslo.error('very error')
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ message: 'Logout successfully' });
    });
});

//////////BOOKING///////////////

app.post('/bookings', async (req, res)=>{
    const {Name,Phone,Address,Department} =req.body;

    try{

        const newbooking = new booking({Name,Phone,Address,Department});
        await newbooking.save()
        res.json({message:"BOOKING SUCCESSFULLY"});
        

        }catch (error){
            console.error("NOT BOOKING")
            res.json({message:"ERROR BOOKING"});

        
    }

});
/////////DELETE BOOKING////////

app.post('/deletebooking', async (req, res)=>{
    const {Name}=req.body;

    const result= await booking.deleteOne({Name})
    if(result===0){
        return res.json({message:"NO BOOKING FOUND WITH THE NAME"});
    }
    res.json({message:"DELETE SUCCESSFULLY"});
});








 app.listen(3000)
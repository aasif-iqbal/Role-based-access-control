import OtpModel from "../models/otp.model";
import otpGenerator from "otp-generator";
import twilio from "twilio";

import { ReturnResponse } from "../utils/interfaces";

import { Request, Response, NextFunction } from "express";

const generateOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let resp: ReturnResponse;
        
        // Retrieve and verify the OTP from the database (omitted for brevity)
        let { phone_number } = req.body;
        
        if (!phone_number) {
            res.status(400).send({ status: 'error', message: 'Phone number is required' });
            return;
        }

        // Generate a 6-digit OTP
        let otp: string = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets:false,specialChars: false });
        
        // Store the OTP in the database
        let phoneNumber_ = { phone_number };

        // Route to set a cookie    
        res.cookie('phoneNumber_', phoneNumber_, {
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
            httpOnly: true,              // Helps prevent XSS attacks
            secure: false,               // Set to true if using HTTPS
            // sameSite: 'Strict',          // Controls whether cookies are sent with cross-site requests            
        });

        console.log('cookie set');

        let recivers_number = phone_number;

        /*
         // Fetch Twilio credentials from environment variables
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
        
        console.log(accountSid, authToken, twilioPhoneNumber, recivers_number);

        if (!accountSid || !authToken || !twilioPhoneNumber) {
            throw new Error("Twilio credentials are missing");
        }

        // Create a Twilio client
        const client = twilio(accountSid, authToken);

        // Function to send an OTP SMS
        const sendOtp = (recivers_number:string, otp:string) => {
            client.messages
                .create({
                    body: `Your OTP is: ${otp}`,
                    from: '+917428617524', // Your Twilio phone number
                    to: '+918368648276' // The phone number you want to send the message to
                })
                .then(message => {
                    console.log(`Message sent with SID: ${message.sid}`);
                    console.log(message.body);
                    // Structure the response                
                })
                .catch(err => {
                    console.error("Failed to send SMS:", err);
                });
        };
        */
       
        resp = {
            status: "success",
            message: "OTP sent successfully. Please verify your account.",
            data: { phone_number, otp } // Include OTP in the response if needed
        };

        // Send the response with status 200
        res.status(200).send(resp);                    
        
        // await sendOtp(phone_number, otp);
        // Save the OTP to the database

        await OtpModel.create({ phone_number, otp });   
        
        } catch (err) {
        console.error(err);
        next(err); // Pass error to the next middleware (error handler)
    }
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    
    try {
        let resp: ReturnResponse;

        const { otp } = req.body;

        // Fetch the signed cookie
        const phoneNumber = Number(req.cookies.phoneNumber_.phone_number);
        
        console.log(req.cookies.phoneNumber_.phone_number);
        console.log('type',typeof phoneNumber);
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number not found in cookies or expired' });
        }

        // Retrieve and verify the OTP from the database (omitted for brevity)
        //fetch last otp
        const latest_otp = await OtpModel.find({ phone_number: phoneNumber }).sort({ createdAt: -1 }).limit(1);

        console.log('latest otp', latest_otp);
        console.log('old',otp);

        if (latest_otp != otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }else{
            resp = {
                status: "success",
                message: "OTP verified successfully",
                data: { phone_number: phoneNumber }
            };
            res.status(200).send(resp);
        }
        
    }catch(err){
        console.error(err);
        next(err);
    }
}

export { generateOtp, verifyOtp };
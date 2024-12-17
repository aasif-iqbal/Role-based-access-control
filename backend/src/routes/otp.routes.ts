import { Router } from "express";

import { generateOtp, verifyOtp } from "../controllers/otp.controller";

const optRouter = Router();

optRouter.post('/send-otp', generateOtp);
optRouter.post('/verify-otp', verifyOtp);

export default optRouter;

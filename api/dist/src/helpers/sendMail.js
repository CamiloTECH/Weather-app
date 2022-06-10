"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, token, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.KEY,
        },
        from: process.env.EMAIL,
    });
    yield transporter.sendMail({
        from: `"Weather App"   <${process.env.EMAIL}>`,
        to: email,
        subject: "Forgot password 🌤️",
        html: ` 
            <img src="https://images.squarespace-cdn.com/content/v1/5572b7b4e4b0a20071d407d4/1487090874274-FH2ZNWOTRU90UAF5TA2B/Weather+Targeting" style="width: 100px;"/>
            <h3>Hello ${userName}: You have requested to reset your password.</h3>
            <p>Follow the next link to generate your new password:
            <a rel="noopener noreferrer" target="_blank" href="http://localhost:3000/${token}">Change Password</a></p>
            <p><strong>If you didn't request this, ignore this message</strong></p>`,
    });
});
exports.sendEmail = sendEmail;

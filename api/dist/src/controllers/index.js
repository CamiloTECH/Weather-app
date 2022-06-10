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
exports.changePassword = exports.validationEmail = exports.loginGoogle = exports.loginUser = exports.registerUser = exports.deleteFavorites = exports.addFavorites = exports.getCityDetails = exports.getCity = exports.getFavCitys = void 0;
const citys_1 = require("../models/citys");
const users_1 = require("../models/users");
const axios_1 = __importDefault(require("axios"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = require("../helpers/token");
const verifyToken_1 = require("../helpers/verifyToken");
const sendMail_1 = require("../helpers/sendMail");
const tokenEmail_1 = __importDefault(require("../helpers/tokenEmail"));
dotenv_1.default.config();
const getFavCitys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCitys = [];
    const verifyUser = yield (0, verifyToken_1.verifyToken)(req);
    try {
        if (verifyUser) {
            const user = yield users_1.users.findByPk(verifyUser.id, {
                attributes: [],
                include: {
                    model: citys_1.citys,
                    attributes: ["name"],
                    through: { attributes: [] },
                },
            });
            if (user) {
                for (const city of user.citys) {
                    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name.trim()}&appid=${process.env.API_KEY}&units=metric`);
                    response.data.fav = true;
                    userCitys.push(response.data);
                }
            }
        }
        res.json(userCitys);
    }
    catch (error) {
        res.json([]);
    }
});
exports.getFavCitys = getFavCitys;
const getCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.params;
    try {
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`);
        response.data.fav = false;
        res.json(response.data);
    }
    catch (error) {
        res.json({});
    }
});
exports.getCity = getCity;
const getCityDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lon } = req.query;
    try {
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}&units=metric`);
        res.json(response.data);
    }
    catch (error) {
        res.json({});
    }
});
exports.getCityDetails = getCityDetails;
const addFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad } = req.body;
    const verifyUser = yield (0, verifyToken_1.verifyToken)(req);
    if (verifyUser) {
        const user = yield users_1.users.findByPk(verifyUser.id);
        const [city, created] = yield citys_1.citys.findOrCreate({
            where: { name: ciudad.trim() },
        });
        const asociacion = yield (user === null || user === void 0 ? void 0 : user.$add("citys", city.id));
        asociacion ? res.json({ status: true }) : res.json({ status: false });
    }
    else
        res.json({ status: false });
});
exports.addFavorites = addFavorites;
const deleteFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad } = req.body;
    const verifyUser = yield (0, verifyToken_1.verifyToken)(req);
    if (verifyUser) {
        const user = yield users_1.users.findByPk(verifyUser.id);
        const city = yield citys_1.citys.findOne({
            where: { name: ciudad.trim() },
        });
        if (user && city) {
            const remover = yield user.$remove("citys", city.id);
            remover == 1 ? res.json({ status: true }) : res.json({ status: false });
        }
        else
            res.json({ status: false });
    }
    else
        res.json({ status: false });
});
exports.deleteFavorites = deleteFavorites;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, email } = req.body;
    const passwordHast = yield bcryptjs_1.default.hash(password, 10);
    const [newUser, created] = yield users_1.users.findOrCreate({
        where: { email },
        defaults: {
            email,
            userName,
            password: passwordHast,
        },
    });
    res.json({ status: created });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield users_1.users.findOne({ where: { email } });
    const correctPassword = user
        ? yield bcryptjs_1.default.compare(password, user.password)
        : false;
    if (correctPassword && user) {
        const token = (0, token_1.generateToken)({ id: user.id });
        res.json({ status: true, token });
    }
    else
        res.json({ status: false, message: "login" });
});
exports.loginUser = loginUser;
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName } = req.body;
    let token = "";
    try {
        const user = yield users_1.users.findOne({ where: { email } });
        if (user) {
            if (user.password.length === 0) {
                token = (0, token_1.generateToken)({ id: user.id });
            }
            else {
                throw new Error("Usuario existente");
            }
        }
        else {
            const newUser = yield users_1.users.create({
                email,
                userName: userName,
                password: "",
            });
            token = (0, token_1.generateToken)({ id: newUser.id });
        }
        res.json({ status: true, token });
    }
    catch (error) {
        res.json({ status: false, message: "loginGoogle" });
    }
});
exports.loginGoogle = loginGoogle;
const validationEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const userExists = yield users_1.users.findOne({ where: { email } });
        if (userExists) {
            if (userExists.password.length > 0) {
                userExists.token = (0, tokenEmail_1.default)();
                yield userExists.save();
                yield (0, sendMail_1.sendEmail)(email, userExists.token, userExists.userName);
                res.json({ status: true });
            }
            else
                res.json({ status: false, message: "googleEmail" });
        }
        else
            res.json({ status: false, message: "normalEmail" });
    }
    catch (error) {
        res.json({ status: false, message: "normalEmail" });
    }
});
exports.validationEmail = validationEmail;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    try {
        if (token && typeof token === "string") {
            const user = yield users_1.users.findOne({ where: { token } });
            if (user) {
                const saltRounds = 10;
                const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
                user.token = "";
                user.password = passwordHash;
                yield user.save();
                res.json({ status: true });
            }
            else
                res.json({ status: false });
        }
        else
            res.json({ status: false });
    }
    catch (error) {
        res.json({ status: false });
    }
});
exports.changePassword = changePassword;

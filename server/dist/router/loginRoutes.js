"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
router.post("/api/v1/login", async (req, res) => {
    const { username, password } = await req.body;
    if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ username: 'Blona' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
        res.status(200).json(token);
    }
    else {
        res.status(401);
    }
});
router.post("/api/v1/validate-token", (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "no token provided" });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ message: "token is valid" });
    }
    catch (error) {
        res.status(401).json({ meessage: "token is invalid" });
    }
});
exports.default = router;
//# sourceMappingURL=loginRoutes.js.map
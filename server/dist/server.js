"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const loginRoutes_1 = __importDefault(require("./router/loginRoutes"));
const uploadRoutes_1 = __importDefault(require("./router/uploadRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "https://pdf-parser-sigma.vercel.app" }));
app.use(loginRoutes_1.default, uploadRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`STARTED SERVER ON PORT ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map
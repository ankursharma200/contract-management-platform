"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blueprintRoutes_1 = __importDefault(require("./routes/blueprintRoutes"));
const contractRoutes_1 = __importDefault(require("./routes/contractRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/blueprints', blueprintRoutes_1.default);
app.use('/api/contracts', contractRoutes_1.default);
// Health Check
app.get('/', (req, res) => {
    res.send('Contract Management API is running...');
});
exports.default = app;

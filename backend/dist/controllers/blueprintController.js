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
exports.getBlueprintById = exports.getBlueprints = exports.createBlueprint = void 0;
const Blueprint_1 = __importDefault(require("../models/Blueprint"));
const createBlueprint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, fields } = req.body;
        const blueprint = yield Blueprint_1.default.create({ name, description, fields });
        res.status(201).json(blueprint);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createBlueprint = createBlueprint;
const getBlueprints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blueprints = yield Blueprint_1.default.find().sort({ createdAt: -1 });
        res.json(blueprints);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBlueprints = getBlueprints;
const getBlueprintById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blueprint = yield Blueprint_1.default.findById(req.params.id);
        if (!blueprint)
            return res.status(404).json({ message: 'Blueprint not found' });
        res.json(blueprint);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBlueprintById = getBlueprintById;

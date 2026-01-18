"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blueprintController_1 = require("../controllers/blueprintController");
const router = express_1.default.Router();
router.route('/').post(blueprintController_1.createBlueprint).get(blueprintController_1.getBlueprints);
router.route('/:id').get(blueprintController_1.getBlueprintById);
exports.default = router;

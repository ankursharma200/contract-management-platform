"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contractController_1 = require("../controllers/contractController");
const router = express_1.default.Router();
router.route('/').post(contractController_1.createContract).get(contractController_1.getContracts);
router.route('/:id').put(contractController_1.updateContractData); // Edit form data
router.route('/:id/status').patch(contractController_1.updateContractStatus); // Change status
exports.default = router;

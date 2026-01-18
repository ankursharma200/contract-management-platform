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
exports.updateContractData = exports.updateContractStatus = exports.getContracts = exports.createContract = void 0;
const Contract_1 = __importDefault(require("../models/Contract"));
const Blueprint_1 = __importDefault(require("../models/Blueprint"));
// Define Allowed Transitions (The State Machine)
const ALLOWED_TRANSITIONS = {
    created: ['approved', 'revoked'],
    approved: ['sent'],
    sent: ['signed', 'revoked'],
    signed: [], // Locked state
    revoked: [] // Locked state
};
const createContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blueprintId, name, formData } = req.body;
        // 1. Verify Blueprint exists
        const blueprint = yield Blueprint_1.default.findById(blueprintId);
        if (!blueprint) {
            return res.status(404).json({ message: 'Blueprint not found' });
        }
        // 2. Create Contract (Inherits structure implicitly via formData validation logic later)
        const contract = yield Contract_1.default.create({
            blueprintId,
            name,
            formData: formData || {}, // Initial data
            status: 'created',
            history: [{ status: 'created', timestamp: new Date() }]
        });
        res.status(201).json(contract);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createContract = createContract;
const getContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        // Populate blueprint data for display
        const contracts = yield Contract_1.default.find(filter)
            .populate('blueprintId', 'name')
            .sort({ createdAt: -1 });
        res.json(contracts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getContracts = getContracts;
const updateContractStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status: newStatus } = req.body;
        const contract = yield Contract_1.default.findById(req.params.id);
        if (!contract)
            return res.status(404).json({ message: 'Contract not found' });
        const currentStatus = contract.status;
        // 1. Check if contract is already finalized (Locked)
        if (['signed', 'revoked'].includes(currentStatus)) {
            return res.status(400).json({
                message: `Contract is ${currentStatus} and cannot be modified.`
            });
        }
        // 2. Validate Transition Logic
        const allowedNextSteps = ALLOWED_TRANSITIONS[currentStatus];
        if (!allowedNextSteps.includes(newStatus)) {
            return res.status(400).json({
                message: `Invalid transition: Cannot move from '${currentStatus}' to '${newStatus}'. Allowed: ${allowedNextSteps.join(', ')}`
            });
        }
        // 3. Apply Update
        contract.status = newStatus;
        contract.history.push({ status: newStatus, timestamp: new Date() });
        yield contract.save();
        res.json(contract);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateContractStatus = updateContractStatus;
const updateContractData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formData } = req.body;
        const contract = yield Contract_1.default.findById(req.params.id);
        if (!contract)
            return res.status(404).json({ message: 'Contract not found' });
        // Prevent editing if locked
        if (['signed', 'revoked'].includes(contract.status)) {
            return res.status(400).json({ message: 'Cannot edit a finalized contract.' });
        }
        contract.formData = formData;
        yield contract.save();
        res.json(contract);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateContractData = updateContractData;

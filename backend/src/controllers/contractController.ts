import { Request, Response } from 'express';
import Contract, { IContract } from '../models/Contract';
import Blueprint from '../models/Blueprint';

// Define Allowed Transitions (The State Machine)
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  created: ['approved', 'revoked'],
  approved: ['sent'],
  sent: ['signed', 'revoked'],
  signed: [], // Locked state
  revoked: [] // Locked state
};


export const createContract = async (req: Request, res: Response) => {
  try {
    const { blueprintId, name, formData } = req.body;

    // 1. Verify Blueprint exists
    const blueprint = await Blueprint.findById(blueprintId);
    if (!blueprint) {
      return res.status(404).json({ message: 'Blueprint not found' });
    }

    // 2. Create Contract (Inherits structure implicitly via formData validation logic later)
    const contract = await Contract.create({
      blueprintId,
      name,
      formData: formData || {}, // Initial data
      status: 'created',
      history: [{ status: 'created', timestamp: new Date() }]
    });

    res.status(201).json(contract);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getContracts = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    // Populate blueprint data for display
    const contracts = await Contract.find(filter)
      .populate('blueprintId', 'name')
      .sort({ createdAt: -1 });
      
    res.json(contracts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateContractStatus = async (req: Request, res: Response) => {
  try {
    const { status: newStatus } = req.body;
    const contract = await Contract.findById(req.params.id);

    if (!contract) return res.status(404).json({ message: 'Contract not found' });

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
    contract.status = newStatus as any;
    contract.history.push({ status: newStatus, timestamp: new Date() });
    await contract.save();

    res.json(contract);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const updateContractData = async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;
    const contract = await Contract.findById(req.params.id);

    if (!contract) return res.status(404).json({ message: 'Contract not found' });

    // Prevent editing if locked
    if (['signed', 'revoked'].includes(contract.status)) {
      return res.status(400).json({ message: 'Cannot edit a finalized contract.' });
    }

    contract.formData = formData;
    await contract.save();

    res.json(contract);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
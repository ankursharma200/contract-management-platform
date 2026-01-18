import { Request, Response } from 'express';
import Blueprint from '../models/Blueprint';


export const createBlueprint = async (req: Request, res: Response) => {
  try {
    const { name, description, fields } = req.body;
    const blueprint = await Blueprint.create({ name, description, fields });
    res.status(201).json(blueprint);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getBlueprints = async (req: Request, res: Response) => {
  try {
    const blueprints = await Blueprint.find().sort({ createdAt: -1 });
    res.json(blueprints);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getBlueprintById = async (req: Request, res: Response) => {
  try {
    const blueprint = await Blueprint.findById(req.params.id);
    if (!blueprint) return res.status(404).json({ message: 'Blueprint not found' });
    res.json(blueprint);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
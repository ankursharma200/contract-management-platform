import express from 'express';
import { createBlueprint, getBlueprints, getBlueprintById } from '../controllers/blueprintController';

const router = express.Router();

router.route('/').post(createBlueprint).get(getBlueprints);
router.route('/:id').get(getBlueprintById);

export default router;
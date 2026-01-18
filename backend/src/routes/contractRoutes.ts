import express from 'express';
import { 
  createContract, 
  getContracts, 
  updateContractStatus, 
  updateContractData 
} from '../controllers/contractController';

const router = express.Router();

router.route('/').post(createContract).get(getContracts);
router.route('/:id').put(updateContractData); // Edit form data
router.route('/:id/status').patch(updateContractStatus); // Change status

export default router;
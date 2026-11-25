
import express from "express";

import {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} from "../controllers/batchController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin authentication
router.use(protect, adminOnly);

// Create Batch
router.post("/", createBatch);

// Get All Batches
router.get("/", getBatches);

// Get Single Batch
router.get("/:id", getBatchById);

// Update Batch
router.put("/:id", updateBatch);

// Delete Batch
router.delete("/:id", deleteBatch);

export default router;

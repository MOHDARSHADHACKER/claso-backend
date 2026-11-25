
import express from "express";

import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require Admin authentication
router.use(protect, adminOnly);

// Add Student
router.post("/", addStudent);

// Get All Students
router.get("/", getStudents);

// Get Single Student
router.get("/:id", getStudentById);

// Update Student
router.put("/:id", updateStudent);

// Delete Student
router.delete("/:id", deleteStudent);

export default router;

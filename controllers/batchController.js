
import Batch from "../models/Batch.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// 1. Create Batch
export const createBatch = async (req, res) => {
  try {
    const { name, subject, startTime, endTime, teacherId } = req.body;

    if (!name || !subject || !startTime || !endTime || !teacherId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!mongoose.isValidObjectId(teacherId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const teacher = await User.findOne({
      _id: teacherId,
      tenantId: req.user.tenantId,
      role: "teacher",
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found in your coaching",
      });
    }

    const batch = await Batch.create({
      name,
      subject,
      startTime,
      endTime,
      teacherId,
      tenantId: req.user.tenantId,
    });

    res.status(201).json({
      success: true,
      message: "Batch created successfully",
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. Get All Batches
export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find({
      tenantId: req.user.tenantId,
    }).populate("teacherId", "name email");

    res.status(200).json({
      success: true,
      total: batches.length,
      batches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. Get Single Batch
export const getBatchById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid batch ID",
      });
    }

    const batch = await Batch.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    }).populate("teacherId", "name email");

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. Update Batch
export const updateBatch = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid batch ID",
      });
    }

    const { name, subject, startTime, endTime, teacherId } = req.body;

    if (
      !name &&
      !subject &&
      !startTime &&
      !endTime &&
      !teacherId
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const batch = await Batch.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    if (teacherId) {
      if (!mongoose.isValidObjectId(teacherId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid teacher ID",
        });
      }

      const teacher = await User.findOne({
        _id: teacherId,
        tenantId: req.user.tenantId,
        role: "teacher",
      });

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found in your coaching",
        });
      }

      batch.teacherId = teacherId;
    }

    if (name) batch.name = name;
    if (subject) batch.subject = subject;
    if (startTime) batch.startTime = startTime;
    if (endTime) batch.endTime = endTime;

    await batch.save();

    res.status(200).json({
      success: true,
      message: "Batch updated successfully",
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. Delete Batch
export const deleteBatch = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid batch ID",
      });
    }

    const batch = await Batch.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Batch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

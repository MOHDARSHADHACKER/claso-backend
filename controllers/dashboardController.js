
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const [totalStudents, totalTeachers] = await Promise.all([
      User.countDocuments({
        tenantId,
        role: "student",
      }),

      User.countDocuments({
        tenantId,
        role: "teacher",
      }),
    ]);

    return res.status(200).json({
      success: true,
      dashboard: {
        totalStudents,
        totalTeachers,
        totalBatches: 0,
        totalRevenue: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

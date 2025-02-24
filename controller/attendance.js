const Sequelize = require("sequelize");
const Attendance = require(`../model/attendance`);
const Students = require(`../model/students`);


exports.getAttendance = async (req, res) =>{
    try {
        const date = req.params.date;

        const attendance = await Attendance.findAll({
          where: { date: date },
          attributes : ["date", "attendance", "studentId"],
          include: 
            {
              model: Students,
              attributes: ["name"],
            },
        });

        res.status(200).json({
            success: true,
            data : attendance
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            error : error.message
        });
    }
};

exports.getAllStudents = async (req, res) =>{
    try {

        const allStudents = await Students.findAll({ attributes : ["id", "name"] });

        res.status(200).json({
            success: true,
            data : allStudents
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            error : error.message
        });
    }
};


/* SELECT 
    attendance.studentId,
    COUNT(attendance.id) AS totalDays,
    SUM(CASE WHEN attendance.attendance = true THEN 1 ELSE 0 END) AS presentDays,
    (SUM(CASE WHEN attendance.attendance = true THEN 1 ELSE 0 END) * 100.0) / COUNT(attendance.id) AS attendancePercentage,
    students.name
FROM attendance
JOIN students ON attendance.studentId = students.id
GROUP BY attendance.studentId; */


exports.getAttendanceReport = async (req, res) =>{
    try {
      
        const attendanceReport = await Attendance.findAll({
            attributes: [
                'studentId',
                [Sequelize.fn('COUNT', Sequelize.col('attendance.id')), 'totalDays'],
                [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN attendance = true THEN 1 ELSE 0 END`)), 'presentDays'],
                [Sequelize.literal(`(SUM(CASE WHEN attendance = true THEN 1 ELSE 0 END) * 100) / COUNT(attendance.id)`), 'attendancePercentage']
            ],
            include: [
                {
                    model: Students,
                    attributes: ['name']
                }
            ],
            group: ['studentId']  // Group only by Attendance.studentId
        });
        
        res.status(200).json({
            success: true,
            data : attendanceReport
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            error : error.message
        });
    }
};


exports.postAllAttendance = async (req, res) =>{
    try {
        const allAttendance = req.body;

        const data = await Attendance.bulkCreate(allAttendance);
      
        res.status(201).json({
            success: true,
            message: "Attendance recorded successfully!",
            data : data
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            error : error.message
        });
    }
};
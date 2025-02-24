const attendanceControllers = require(`../controller/attendance`);
const express  = require(`express`);

const router = express.Router();


router.get('/students', attendanceControllers.getAllStudents);

router.get('/report', attendanceControllers.getAttendanceReport);

router.get('/:date', attendanceControllers.getAttendance);

router.post('/', attendanceControllers.postAllAttendance);


/* 
    

    

    router.put();

    
*/

module.exports = router;
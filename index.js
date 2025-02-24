const express = require(`express`);
//const studentRoutes = require(`./routes/students`);
const attendanceRoutes = require(`./routes/attendance`);
const bodyParser = require("body-parser");
const db = require(`./utils/database`);
const Students = require(`./model/students`);
const Attendance = require(`./model/attendance`);
const cors = require(`cors`);


const app = express();


app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(attendanceRoutes);

/* async function create() {
    try {
        const studentsName = ["Siva", "Rajesh", "Ashok", "Sai", "Haritha", "Ram", "Krishna", "Anu", "Ammu", "Adi", "Venkat"];
        const allStudents = studentsName.map(name => ({ name: name }));
        
        const result = await Students.bulkCreate(allStudents);
        console.log(`Successfully created ${result.length} student records`);
        return result;
        
    } catch (error) {
        console.error('Error creating students:', error.message);
        throw error; // Re-throw the error for proper error handling
    }
}

create();  */

Students.hasMany(Attendance, { foreignKey: 'studentId',  sourceKey: 'id', onDelete: 'CASCADE' });
Attendance.belongsTo(Students, { foreignKey: 'studentId' });


db.sync(/* { force : true } */)
.then(() => {
    console.log('Database connected and synced');
    app.listen(4000, () => console.log('Server running on port 4000'))
})
.catch((err) => console.error('Unable to connect to the database:', err));
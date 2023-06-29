const express = require("express");
const studentsController = require("../controllers/studentController")


module.exports = (app)=>{
    const router = express.Router();
    const studentControllerInstance = new studentsController(app);

    router.get("/list/:searchQuery?", studentControllerInstance.listStudents);

    router.get("/find/:ra", studentControllerInstance.findStudentByRA);

    router.post("/save", studentControllerInstance.registerStudent);

    router.put('/edit/:ra',studentControllerInstance.editStudentByRA);

    router.delete("/delete/:ra",studentControllerInstance.deleteStudent);

    return router;
}
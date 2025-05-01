import { Router } from "express";
import { createStudentController, deleteStudentByIdController, getAllStudentsController, getStudentByIdController, updateStudentByIdController } from "./student.controller";
import validateObjectId from "../../middleware/validateObjectId";

const StudentsRoutes = Router();

StudentsRoutes.post("/", createStudentController);
StudentsRoutes.get("/", getAllStudentsController);
StudentsRoutes.get("/:id",validateObjectId('id'), getStudentByIdController);
StudentsRoutes.delete("/:id", validateObjectId('id'),deleteStudentByIdController);
StudentsRoutes.patch("/:id", updateStudentByIdController);


export default  StudentsRoutes;

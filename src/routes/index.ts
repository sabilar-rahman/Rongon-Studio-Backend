import { Router } from "express";
import StudentsRoutes from "../app/modules/Student/student.routes";

const unprotectedRoutes = [
    {
      path: "/login",
    },
  ];


  const protectedRoutes = [
 {
    path:"/students",  route:StudentsRoutes
 }

  ]




const mainRouter = Router();

protectedRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
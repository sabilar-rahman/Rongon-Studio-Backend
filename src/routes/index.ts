import { Router } from "express";
import StudentsRoutes from "../app/modules/Student/student.routes";
import BatchRoutes from "../app/modules/Batch/batch.routes";
import TradeRoutes from "../app/modules/Trade/trade.routes";

const unprotectedRoutes = [
  {
    path: "/login",
  },
];

const protectedRoutes = [
  {
    path: "/students",
    route: StudentsRoutes,
  },
  {
    path: "/batch",
    route: BatchRoutes,
  },
  {
    path: "/trade",
    route: TradeRoutes,
  },
];

const mainRouter = Router();

protectedRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;

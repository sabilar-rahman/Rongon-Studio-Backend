import { Router } from "express";

import validateObjectId from "../../middleware/validateObjectId";
import { createBatchController, deleteBatchByIdController, getAllBatchController, getBatchByIdController, updateBatchByIdController } from "./Batch.controller";

const BatchRoutes = Router();

BatchRoutes.post("/", createBatchController);
BatchRoutes.get("/", getAllBatchController);
BatchRoutes.get("/:id",validateObjectId('id'), getBatchByIdController);
BatchRoutes.delete("/:id", validateObjectId('id'),deleteBatchByIdController);
BatchRoutes.patch("/:id", updateBatchByIdController);


export default  BatchRoutes;
import { Router } from "express";
import validateObjectId from "../../middleware/validateObjectId";
import { createTradeController, deleteTradeByIdController, getAllTradesController, getTradeByIdController, updateTradeByIdController } from "./trade.controller";


const TradeRoutes = Router();

TradeRoutes.post("/", createTradeController);
TradeRoutes.get("/", getAllTradesController);
TradeRoutes.get("/:id",validateObjectId('id'), getTradeByIdController);
TradeRoutes.delete("/:id", validateObjectId('id'),deleteTradeByIdController);
TradeRoutes.patch("/:id", updateTradeByIdController);


export default  TradeRoutes;

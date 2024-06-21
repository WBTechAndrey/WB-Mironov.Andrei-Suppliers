import { Router } from "express";
import {
  createData,
  getInfoToAddShip,
  removeData,
  updateData,
  getShipments,
  getShipmentById,
  getSearchInfoParams,
} from "../controllers/serverController.js";

const router = Router();

router.get("/add", getInfoToAddShip);
router.get("/search", getSearchInfoParams);
router.get("/shipments", getShipments);
router.get("/shipments/:id", getShipmentById);
router.post("/shipments", createData);
router.delete("/shipments/:id", removeData);
router.put("/shipments/:id", updateData);

export default router;

import express from 'express';
import {countByCity, countByType, createRestaurant, 
  deleteRestaurant, 
  getRestaurant, 
  getRestaurantTables, 
  getRestaurants, 
  updateRestaurant 
} from "../controllers/restaurant.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

router.post("/", verifyAdmin, createRestaurant);

router.put("/:id",verifyAdmin, updateRestaurant);

router.delete("/:id",verifyAdmin, deleteRestaurant);

router.get("/find/:id", getRestaurant);

router.get("/", getRestaurants);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/table/:id", getRestaurantTables);


export default router;

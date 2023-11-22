import Restaurant from "../models/Restaurant.js";
import Table from "../models/Tables.js";

export const createRestaurant = async (req, res, next)=>{
    const newRestaurant = new Restaurant(req.body)
  try {
    const savedRestaurant = await newRestaurant.save()
    res.status(200).json(savedRestaurant)
  } catch (err) {
    next(err);
  }
}

export const updateRestaurant = async (req, res, next)=>{
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body },
          { new: true })
        res.status(200).json(updatedRestaurant);
      } catch (err) {
    next(err);
  }
}

export const deleteRestaurant = async (req, res, next)=>{
    try {
        await Restaurant.findByIdAndDelete(
          req.params.id
        );
        res.status(200).json("restaurant has been deleted");
      } catch (err) {
    next(err);
  }
}

export const getRestaurant = async (req, res, next)=>{
    try {
        const restaurant = await Restaurant.findById(
          req.params.id
        );
        res.status(200).json(restaurant);
      } catch (err) {
    next(err);
  }
}

export const getRestaurants = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const restaurants = await Restaurant.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(parseInt(limit, 10) || 0); 
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Restaurant.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const restaurantCount = await Restaurant.countDocuments({ type: "restaurant" });
    const dabaCount = await Restaurant.countDocuments({ type: "daba" });
    const cafeCount = await Restaurant.countDocuments({ type: "cafe" });
    const starrestaurantCount = await Restaurant.countDocuments({ type: "starrestaurant" });
    const outdoorCount = await Restaurant.countDocuments({ type: "outdoor" });

    res.status(200).json([
      { type: "restaurants", count: restaurantCount },
      { type: "dabas", count: dabaCount },
      { type: "cafes", count: cafeCount },
      { type: "starrestaurants", count: starrestaurantCount },
      { type: "outdoors", count: outdoorCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getRestaurantTables = async (req, res, next)=> {
  try{
    const restaurant = await Restaurant.findById(req.params.id);
    const list = await Promise.all(
      restaurant.tables.map((table)=>{
      return Table.findById(table);
    })
    );
    res.status(200).json(list)
  } catch(err){
    next(err)
  }
};
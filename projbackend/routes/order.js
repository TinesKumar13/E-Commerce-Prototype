const express = require("express")
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const {updateStock} = require("../controllers/product")


const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus, getOrder, getUserById } = require("../controllers/order");




//params

router.param("userId", getUserById)
router.param("orderId",getOrderById)

//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, updateStock, createOrder);

//read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)
router.get("/order/:userId", isSignedIn, isAuthenticated, getOrder)


//status of order

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)


//Actual routes
module.exports= router;
import colors from 'colors';
import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
dotenv.config();
connectDB();


const importData=async()=>{
    try{
            await User.deleteMany();
            await Product.deleteMany();
            await Order.deleteMany();
            const createdUsers=await User.insertMany(users);
            console.log("Users",createdUsers);
            const adminUser=createdUsers[3]._id;
            console.log("AdminUser",adminUser);
            const sampleProducts=products.map((pro)=>{
                return {...pro,user:adminUser}
            });
            console.log("Sample Products",sampleProducts);
            await Product.insertMany(sampleProducts);
            console.log("Data imported".green.inverse);
            process.exit(1);
    }catch(err){
        console.log(`Error:${err.message}`.red.inverse);
        process.exit(1);
    }
}
const destroyData=async()=>{
    try{
            await User.deleteMany();
            await Product.deleteMany();
            await Order.deleteMany();
            
            console.log("Data destroyed".red.inverse);
            process.exit(1);
    }catch(err){
        console.log(`Error:${err.message}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}
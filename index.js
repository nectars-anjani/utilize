require('dotenv').config();
const express=require('express');
const router=require('./router');

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use('/',(req,res)=>{res.send("hi");console.log("2")});
app.use('/',router)
const port=4000||process.env.PORT;
app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});

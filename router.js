
const express= require('express');
const route=express.Router();
const {authorize} =require('./authorize');

route.get('/',(req,res)=>{
    console.log(req.query);
})
route.get('/login', authorize,async(req,res,err)=>{
   try{
    console.log(req.query);
       console.log("Generated the token successfully");
       return res.send("Inside login");
   }catch(err){
    console.log(err,'=>Error in login route')
   }
});

route.get('/spreadsheet/:id',async(res,err)=>{
   try{
       authorize(1)
    console.log("Generated the token",res);
   }catch(err){
    console.log(err,'=>Error in spreadsheet reading route')
   }
});

route.post('spreadsheet/update',async(res,err)=>{
   try{
       authorize(2)
    console.log("Generated the token",res);
   }catch(err){
    console.log(err,'=>Error in spreadsheet updating route')
   }
})



module.exports=route
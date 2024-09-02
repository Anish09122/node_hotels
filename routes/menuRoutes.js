const express=require('express')
const router=express.Router()
const menuItem= require('./../models/menu');
router.post('/',async(req,res)=>{
    try{
      const data=req.body
    const newMenu=new menuItem(data);
    const response=await newMenu.save();
    console.log('data saved')
    res.status(200).json(response)
    }
    catch(err){
    console.log(err);
    res.status(500).json({err:'Internal server error'})
  }
    })
    router.get('/',async(req,res)=>{
      try{
           const data= await menuItem.find()
           console.log('data saved')
           res.status(200).json(data)
      }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'})
      }
       
    })
    router.get('/:taste',async(req,res)=>{
      try{
        const taste=req.params.taste
        if(taste=='spicy' || taste=='sweet'||taste=='sour')
        {
            const response=await menuItem.find({taste:taste})
            console.log("response fetched")
            res.status(200).json(response)
        }else{
          res.status(400).json({error:"Invalid Taste"})
        }
      }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'})
    }
    })
    router.put('/:id',async(req,res)=>{
      try{
         const menuId=req.params.id
         const updatemenuData=req.body
         const response=await menuItem.findByIdAndUpdate(menuId,updatemenuData,{
          new:true,
          runValidators:true
         })
         if(!response){
          return res.status(404).json({error:"Menu not found"})
         }
         console.log('data updated')
         res.status(200).json('Data updated')

      }catch(err){
            res.status(err)
            res.status(500).json({err:"Internal server error"})
      }
    })
    router.delete('/:id',async(req,res)=>{
      try{
            const menuId=req.params.id
            const response=await menuItem.findByIdAndDelete(menuId)
            if(!response){
              return res.status(404).json({error:"menu not found"})
            }
            console.log('data updated')
            res.status(200).json('Delete Sucessfully')
      }catch(err){
        res.status(err)
        res.status(500).json({err:"Internal server error"})
      }
    })
    module.exports=router
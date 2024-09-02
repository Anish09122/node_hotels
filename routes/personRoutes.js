const express=require('express')
const router=express.Router()
const person = require('./../models/person');
router.get('/',async(req,res)=>{
    try{
         const data= await person.find()
         console.log('data saved')
         res.status(200).json(data)
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal server error'})
    }
     
  })
  router.post('/',async(req,res)=>{
    try{
      const data=req.body
    const newPerson=new Person(data);
    const response=await newPerson.save();
    console.log('data saved')
    res.status(200).json(response)
    }
    catch(err){
    console.log(err);
    res.status(500).json({err:'Internal server error'})
  }
    })
    router.get('/:workType',async(req,res)=>{
        try{
          const workType=req.params.workType
          if(workType=='chef' || workType=='manager'||workType=='waiter')
          {
              const response=await person.find({work:workType})
              console.log("response fetched")
              res.status(200).json(response)
          }else{
            res.status(400).json({error:"Invalid Work Type"})
          }
        }catch(err){
          console.log(err);
          res.status(500).json({err:'Internal server error'})
      }
      })
      router.put('/:id',async(req,res)=>{
        try{
           const personId=req.params.id
           const updatePersonData=req.body
           const response=await person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true
           })
           if(!response){
            return res.status(404).json({error:"Person not found"})
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
              const personId=req.params.id
              const response=await person.findByIdAndDelete(personId)
              if(!response){
                return res.status(404).json({error:"Person not found"})
              }
              console.log('data updated')
              res.status(200).json('Delete Sucessfully')
        }catch(err){
          res.status(err)
          res.status(500).json({err:"Internal server error"})
        }
      })
      module.exports=router
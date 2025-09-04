const express = require('express');
const { employee } = require('../models/employee');
const cloudinary = require('cloudinary').v2;
const router  = express.Router();

router.get('/', async (req, res) => {
    try {
        
        const employeelist = await employee.find();

        if (!employeelist) {
            return res.status(500).json({ success: false });
        }

        res.send(employeelist);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.post('/create', async (req, res) => {
  try {
    const { profileImage } = req.body;
    let imgUrl = "";

    if (profileImage) {
      const uploadResult = await cloudinary.uploader.upload(profileImage, {
        folder: "employees",
      });
      imgUrl = uploadResult.secure_url;
    }

    let Employees = new employee({
      name: req.body.name,
      Role: req.body.Role,
      Department: req.body.Department,
      Mobile: req.body.Mobile,
      JoiningDate: req.body.JoiningDate,
      Email: req.body.Email,
      Gender: req.body.Gender,
      Address: req.body.Address,
      EmployeeStatus: req.body.EmployeeStatus,
      profileImage: imgUrl,  
    });

    Employees = await Employees.save();
    if (!Employees) {
      return res.status(500).json({
        error: "Error saving employee",
        success: false,
      });
    }

    res.status(201).json(Employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id' ,async(req,res)=>{
  const Employees = await employee.findById(req.params.id);
  if(!Employees){
    res.status(500).json({message:'the employees given id was not found.'})
  }
  return res.status(200).send(Employees);
})

router.delete('/:id', async(req,res)=>{
    const deleteemployee = await employee.findByIdAndDelete(req.params.id);
    if(!deleteemployee){
      return res.status(404).json({
        message:"employees does not found !",
        status:false
      })
    }
    res.status(200).send({
      message:"employees is deleted !",
      status:true
    })
})

router.put('/:id', async(req,res)=>{
  const Employees = await employee.findByIdAndUpdate(
    req.params.id,{
      name:req.body.name,
      Role:req.body.Role,
      Department:req.body.Department,
      Mobile:req.body.Mobile,
      JoiningDate:req.body.JoiningDate,
      Email:req.body.Email,
      Gender:req.body.Gender,
      Address:req.body.Address,
      EmployeeStatus:req.body.EmployeeStatus,
    },
    {new:true}
  );

  if(!Employees){
    res.status(404).json({
      message:'this is can not update',
      status:false
    })
  }
  res.status(200).json({
    message:'Employees is update',
    status:true
  })
})

module.exports = router;
const express = require('express');
const { employee } = require('../models/employee');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

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


router.post('/create', upload.single('profileImage'), async (req, res) => {
  try {
    let imgUrl = '';
    if (req.file) {
      imgUrl = `/uploads/${req.file.filename}`; 
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
    res.status(201).json(Employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const emp = await employee.findOne({ name: req.params.name });

    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (!emp.profileImage) {
      return res.status(404).json({ message: 'No profile image found for this employee' });
    }

    res.status(200).json({
      name: emp.name,
      profileImage: `https://empmangment-backend.onrender.com${emp.profileImage}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const Employees = await employee.findById(req.params.id);
  if (!Employees) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.status(200).send(Employees);
});

router.delete('/:id', async (req, res) => {
  const deleteemployee = await employee.findByIdAndDelete(req.params.id);
  if (!deleteemployee) {
    return res.status(404).json({ message: "Employee not found!", status: false });
  }
  res.status(200).json({ message: "Employee deleted!", status: true });
});

router.put('/:id', upload.single('profileImage'), async (req, res) => {
  try {
    let updateData = {
      name: req.body.name,
      Role: req.body.Role,
      Department: req.body.Department,
      Mobile: req.body.Mobile,
      JoiningDate: req.body.JoiningDate,
      Email: req.body.Email,
      Gender: req.body.Gender,
      Address: req.body.Address,
      EmployeeStatus: req.body.EmployeeStatus,
    };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const Employees = await employee.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!Employees) {
      return res.status(404).json({ message: 'Update failed', status: false });
    }
    res.status(200).json({ message: 'Employee updated!', status: true, Employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
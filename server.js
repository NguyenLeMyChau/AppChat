const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/user.js');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB


mongoose.connect('mongodb://127.0.0.1:27017/Zalo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB Connected Successfully"))
  .catch((error) => {
    console.log("An error occurred while connecting to the database: " + error);
    process.exit(1);
  });
  app.get('/', async (req, res) => {
    try {
      const users = await user.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' });
    }
  });
app.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const users = await user.findOne({ phone, password });
        if (users) {
            res.json({ success: true, user });
        } else {
            res.json({ success: false, message: 'Sai số điện thoại hoặc mật khẩu' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' });
    }
});

app.post('/register', async (req, res) => {
  const { name, password, phone, email ,avatar,gender} = req.body;
 
  // Check if email is already registered
  const existinguser = await user.findOne({ email });
  if (existinguser) {
      return res.status(400).json({ success: false, message: 'email đã tồn tại' });
  }

  try {
      // Create a new user
      const newuser = new user({
          name,
          email,
          password,
          avatar,
          phone,
          gender
      });
      console.log(newuser);
      await newuser.save();
      res.status(201).json({ success: true, message: 'Đăng ký thành công' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi đăng ký server' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

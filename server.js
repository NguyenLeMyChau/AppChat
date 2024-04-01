const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');

const app = express();
const port = 4000;

app.use(express.json());

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
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' });
    }
  });
app.post('/login', async (req, res) => {
    const { Phone, Password } = req.body;
    res.send(Phone,Password);
    try {
        const user = await User.findOne({ Phone, Password });
        if (user) {
            res.json({ success: true, user });
        } else {
            res.json({ success: false, message: 'Sai số điện thoại hoặc mật khẩu' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

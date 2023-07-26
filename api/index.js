const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");

const createRandomToken = (length) => {
  return crypto.randomBytes(length).toString("hex");
};
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");
mongoose
  .connect(
    "mongodb+srv://phamtiendungvn2363:dungpt2363@cluster0.lcapinl.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => {
  console.log("Server running on port 8000");
});
const User = require("./models/user");
const Message = require("./models/message");

// dang ky
app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  //them nguoi dung vao object
  const newUser = new User({ name, email, password, image });
  //luu nguoi dung vao database
  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "Đăng ký thành công" });
    })
    .catch((err) => {
      console.log("Lỗi đăng ký", err);
      res.status(500).json({ message: "Đăng ký không công" });
    });
});
const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  // Tạo mã  ngẫu nhiên
  const randomToken = createRandomToken(32); // Thay đổi độ dài thành độ dài mã thông báo mong muốn của bạn

  // Tạo mã thông báo với chuỗi ngẫu nhiên và thời gian hết hạn
  const token = jwt.sign(payload, randomToken, { expiresIn: "1h" });

  return token;
};
// dang nhap
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // check
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and the password are required" });
  }
  // check user trong database
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // user khong tim thay
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
      if (user.password !== password) {
        return res.status(404).json({ message: "Mật khẩu không khớp" });
      }
      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log("Không tìm thấy người dùng", error);
      res.status(500).json({ message: "Lỗi" });
    });
});

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
  const randomToken = createRandomToken(32);
  // Thay đổi độ dài thành độ dài mã thông báo mong muốn của bạn

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

app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;
  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Lỗi: ", err);
      res.status(500).json({ message: "Lỗi khi truy xuất người dùng" });
    });
});
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;
  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { freindRequests: currentUserId },
    });
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: currentUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});
app.get("/friend-request/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("freindRequests", "name email image")
      .lean();

    const freindRequests = user.freindRequests;

    res.json(freindRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/friend-request/accept", async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.freindRequests = recepient.freindRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose.connect(
  "mongodb+srv://ashfaq1:ashfaq@simple-project.km5b5xe.mongodb.net/?retryWrites=true&w=majority&appName=simple-project",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.create({
      username,
      email,
      password, // Storing the password directly without hashing
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (password === user.password) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/userinfo", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.query.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/updateinfo", async (req, res) => {
  const { username, profession, interests, bio } = req.body;
  try {
    const updateData = {};
    if (profession !== undefined && interests !== undefined) {
      updateData.profession = profession;
      updateData.interests = interests;
    }
    if (bio !== undefined) {
      updateData.bio = bio;
    }
    const user = await UserModel.findOneAndUpdate({ username }, updateData, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve the React application
app.use(express.static(path.join(__dirname, "frontend", "build")));

// For any other route, serve the React application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

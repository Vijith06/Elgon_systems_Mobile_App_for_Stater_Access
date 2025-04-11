const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

mongoose.connect("mongodb+srv://kaviprashaadl22ece:i7tU7keVCAQD2KSq@cluster.4ft9iq2.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


// User Schema & Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash Password

    // Save user to database
    const newUser = new User({ email, password: password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


//allowed user

const allowedUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // You can remove password if not needed in allowed users
});

const AllowedUser = mongoose.model("AllowedUser", allowedUserSchema);


app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


app.post("/allow-user", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user in the main collection
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Move user to the allowedUsers collection
    const newAllowedUser = new AllowedUser({ email, password: user.password });
    await newAllowedUser.save();

    // Remove the user from the original collection if needed
    await User.deleteOne({ email });

    res.status(200).json({ message: "User allowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.delete("/delete-user", async (req, res) => {
  const { email } = req.body;

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


//login page 


const ADMIN_EMAIL = "vijith@gmail.com";  // Default Admin Email
const ADMIN_PASSWORD = "12345678";        // Default Admin Password

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user is the default admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.status(200).json({ message: "Admin Login", isAdmin: true });
    }

    // Check if user exists in allowed-users collection
    const user = await AllowedUser.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not allowed" });
    }

    // (Optional) Check password
   
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", isAdmin: false });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

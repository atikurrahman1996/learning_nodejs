const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB connection

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testProductDB");
    console.log("mongo db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error.message);
    process.exit(1);
  }
};

//Create product Schema

const productsSchema = new mongoose.Schema({
  //for validition we can use required function
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create product Model

const productModel = mongoose.model("Products", productsSchema);

app.listen(PORT, async () => {
  console.log(`The server is runnint at http://localhost:${PORT}`);
  await connectDB();
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the server");
});

// Create

app.post("/products", async (req, res) => {
  try {
    const newProduct = new productModel({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    });
    const productData = await newProduct.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Read

//Find all product

app.get("/products", async (req, res) => {
  try {
    const products = await productModel.find(); //const products = await productModel.find().limit(2) here we can see two products

    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ message: "products not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Find product with specific id

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findOne({ _id: id });

    if (product) {
      res.status(200).send({
        success: true,
        message: "Single product found",
        data: product,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

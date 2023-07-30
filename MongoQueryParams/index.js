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
  rating: {
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

app.post("/products", async (req, res) => {
  try {
    const newProduct = new productModel({
      title: req.body.title,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
    });
    const productData = await newProduct.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/*
//Query operators, $eq, $gt, $gte, $lt, $lte, $ne

app.get("/products", async (req, res) => {
  try {
    const price = req.query.price; //if users search for random price
    let products;
    if (price) {
      products = await productModel.find({ price: { $gt: price } });
    } else {
      products = await productModel.find();
    }

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
      res.status(200).send({ message: "product found" });
    } else {
      res.status(404).send({ message: "products not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
*/

//Logical operators   $or , $and,  $nor

app.get("/products", async (req, res) => {
  try {
    const price = req.query.price; //if users search for random price
    const rating = req.query.rating; //if users search for random rating
    let products;
    if (price && rating) {
      products = await productModel.find({
        //$or: [{ price: { $gt: 5000 } }, { rating: { $gt: 4 } }],   //static value
        //$and: [{ price: { $gt: 500 } }, { rating: { $gt: 4 } }],
        $and: [{ price: { $gt: price } }, { rating: { $gt: rating } }], //dynamic value
      });
    } else {
      products = await productModel.find();
    }

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
      res.status(200).send({ message: "product found" });
    } else {
      res.status(404).send({ message: "products not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

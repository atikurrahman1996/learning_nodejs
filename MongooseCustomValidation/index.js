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
    required: [true, "product title is rquired"],
    minLength: [4, "minimum length of the product title 4 is rquired"],
    maxLength: [50, "maximum length of the product title  50 is rquired"],
    trim: true, // remove white space //enum: ["iphone14", "samsung", "vivo", "xiomi"],  // we have to search in betwwen enum mobiles set
  },

  price: {
    type: Number,
    min: [100, "minimum price of the product is hundred tk  "],
    max: [1100, "maximum price of the product is eleven hundred tk"],
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

  // custom validator

  phone: {
    type: String,
    required: [true, "phone number is required"],

    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
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

//Create

app.post("/products", async (req, res) => {
  try {
    const newProduct = new productModel({
      title: req.body.title,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
      phone: req.body.phone,
    });
    const productData = await newProduct.save();

    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Read

app.get("/products", async (req, res) => {
  try {
    const price = req.query.price; //if users search for random price
    const rating = req.query.rating; //if users search for random price
    let products;
    if (price && rating) {
      products = await productModel.find({
        $and: [{ price: { $gt: price } }, { rating: { $gt: rating } }],
      });
    } else {
      products = await productModel.find();
    }

    if (products) {
      res.status(200).send({
        success: true,
        message: "return all products",
        data: products,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "products not found",
      });
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

//Delete

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.deleteOne({ _id: id }); //if we want to see which product deleted used -finfByIdAndDelete
    if (product) {
      res.status(200).send({
        success: true,
        message: "delete single product",
        data: product,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "product was not deleted",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Update

app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    /*const updatedProduct = await productModel.updateOne(
      
      { _id: id },
      {
        $set: {
          rating: 4.9,   //static value 
        },
      }
    ); */

    const updatedProduct = await productModel.findByIdAndUpdate(
      //if we want to see which product deleted used -finfByIdAndUpdate
      //Dynamic  value

      { _id: id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          rating: req.body.rating,
        },
      }
    );

    if (updatedProduct) {
      res.status(200).send({
        success: true,
        message: " product is updated",
        data: updatedProduct,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "product was not updated",
      });
    }
  } catch (error) {
    // Handle the error

    res.status(500).send({ message: error.message });
  }
});

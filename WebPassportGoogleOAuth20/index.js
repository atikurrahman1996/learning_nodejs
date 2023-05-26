require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The Server is running at http://localhost:${PORT}`);
});

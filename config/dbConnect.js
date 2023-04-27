const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed", error.message);
  }
};

dbConnect();

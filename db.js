let mongoose = require("mongoose");


module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD),
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        console.log("Data Base Connected")    
    } catch (error) {
        console.log(error.message)
    }
}




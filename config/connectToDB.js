const mongoose = require("mongoose")


const connectToDb = () => {

    mongoose.connect(process.env.MONGO_URL)
        .then(res =>
            console.log('connected')
        )
        .catch(err => console.log(err))


}



module.exports = connectToDb;
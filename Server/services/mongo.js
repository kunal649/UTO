const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectDB = async(uri) => {
try {
    const conn = await mongoose.connect(uri);
    console.log(`Conncted to database ${conn.connection.host} `);
} catch(err) {
   console.log('Might be some error, here it is',err);
}
};

module.exports=connectDB;
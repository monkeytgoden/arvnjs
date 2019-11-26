const mongoose = require('mongoose');

const mongooseConn = mongoose.connection;

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log('MONGO_DB Connected!'));

mongooseConn.on('error', (err) => {
    console.log('MONGO_DB connection error:', err.message);
});

module.exports = mongooseConn;
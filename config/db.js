require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_URL,
	{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
).
then(() => {
	console.log("database Connected");
}).catch((ex) => {
	console.log("Connection Failed : ",ex);
});


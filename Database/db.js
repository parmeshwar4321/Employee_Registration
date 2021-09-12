const mongoose = require('mongoose')

const env = require('dotenv').config({ path: `/home/sandhya/Documents/Project/.env` })
const url = env.parsed.db_Name

mongoose.connect(url)
.then((result) => {
    console.log(`Db connected`);
    
}).catch((err) => {
    console.log(err);
});

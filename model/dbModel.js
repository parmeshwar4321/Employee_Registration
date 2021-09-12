const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Organization_Name: String
})

module.exports=mongoose.model("employeeData",employeeSchema)
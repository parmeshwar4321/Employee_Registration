const express=require('express')
const morgan=require('morgan')
var util= require('util');
var encoder = new util.TextEncoder('utf-8');
const app=express()
require('dotenv').config();
require('./Database/db')
const port=process.env.Port||2022
app.use(express.json())
app.use(morgan('dev'))
app.use('',require('./routes/employee'))
app.listen(port,()=>console.log(`SERVER IS RUNNING AT :: ${port}`))

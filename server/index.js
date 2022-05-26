require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongodb = require('./config/mongodb.js')
const createAdmin = require('./config/create-admin.js')
const employeeRoute = require("./routes/employee");
const userRoute = require("./routes/user");
const departmentRoute = require("./routes/department");
const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/employee', employeeRoute)
app.use('/api/department', departmentRoute)
app.use('/api/user', userRoute)

app.get('/ping', (req, res) => res.status(200).json({ message: "Server is up and running" }))

app.listen(port, async () => {
    await mongodb();
    createAdmin()
    console.log(`Listening on port ${port}`);
});
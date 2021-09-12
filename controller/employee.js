const db = require('../model/dbModel')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../Auth/jwt')
//create user
exports.createEmployee = async (req, res) => {
    try {
        var encoded = bcrypt.hashSync(req.body.Password, 10)
        const employeeData = {
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Email: req.body.Email,
            Password: encoded,
            Organization_Name: req.body.Organization_Name
        }
        const response = await db.create(employeeData)
        console.log(response);
        res.status(200).json({ message: " user created Successfully !" })

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error })
    }
    var encoded = bcrypt.hashSync(req.body.Password, 10)
    const employeeData = {
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Email: req.body.Email,
        Password: encoded,
        Organization_Name: req.body.Organization_Name
    }
    const response = await db.insertMany(employeeData)
    console.log(response);
}

exports.login = async (req, res) => {
    try {
        await db.findOne({ Email: req.body.Email })
            .then(async (data) => {
                if (data == null) {
                    console.log({ "message": "first do signUp" });
                    return res.status(404).json({
                        "message": "first do signUp"
                    })
                } else {
                    const match = await bcrypt.compare(req.body.Password, data.Password)
                    // console.log("data.passworddata.passworddata.password", match);
                    if (match !== true) {
                        console.log({ message: "User not found..." });
                        return res.json({ message: "User not found..." })
                    } else {
                        const encoded = { id: data._id, First_Name: data.First_Name }
                        const token = generateAccessToken(encoded)
                        // console.log(token);
                        res.cookie("token", token)
                        console.log({ message: 'User logIn successful' });
                        return res.status(200).json({ message: 'User logIn successful' })
                    }
                }
            })
    } catch (ar) {
        console.log(ar);
    }
}

//get User
exports.getAllusers = async (req, res) => {
    try {
        const getAllusers = await db.find()
        console.log(getAllusers);
        res.status(200).json({ message: getAllusers })
    }


    catch (er) {
        console.log(er);
        res.status(404).json({ message: er })
    }
}

//update by id
exports.updateUser = async (req, res) => {
    const userId = req.params.id
    encoded = bcrypt.hashSync(req.body.Password, 10)
    try {
        console.log(encoded);
        const message = await db.findByIdAndUpdate(
            userId, {
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Email: req.body.Email,
            Password: encoded,
            Organization_Name: req.body.Organization_Name
        }
        )
        console.log(message);
        res.status(200).json({ message: message })

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error })
    }

}

//delete by id
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const message = await db.findByIdAndDelete(
            userId, (err, data) => {
                if (err) {
                    console.log("message", err);
                    res.status(404).json({ message: err })
                }

                console.log(data);
            }
        )
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error })
    }

}

//deleteall Users
exports.deleteAllusers = async (req, res) => {
    try {
        const message = await db.deleteMany(
            userId, (err, data) => {
                if (err) {
                    console.log("message", err);
                    res.status(404).json({ message: err })
                }

                console.log(data);
            }
        )
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error })
    }

}



//search
// /search?search='search any keyworld'
exports.searchEmp = async (req, res) => {
    try {
        const search = req.query.search
        console.log(search);
        const data = await db.find({
            $or: [
                { First_Name: search },
                { Last_Name: search },
                { _id: search }
            ]
        }
        )
        console.log(data);
        res.json({ message: data })
    } catch (er) {
        console.log(er);
        res.json({ message: er })
    }
}
// exports.searchEmp = async (req, res) => {
//     try {

//         console.log(searchData);
// db.aggregate(
//     [
//         { $match: { $text: { $search: search } } },
//           { $group: { _id: null, views: { $sum: "$views" } } }
//     ]
// )
// await db.aggregate([{
//     $search: {
//         text: {
//             query: ["ranjan",'subhash'],
//             path: "employeedatas"
//         }
//     }
// }])

//////////////////
//  db.find({
//     $search: {
//         $in: [{
//             _id: req.body._id,
//             First_Name: req.body.First_Name,
//             Last_Name: req.body.Last_Name,
//             Email: req.body.Email
//         }]  
//     }
// })

//         res.send({ message: searchData })
//     } catch (er) {
//         console.log(er);
//     }
// }
exports.orderByname = async (req, res) => {
    try {
        assOrder = await db.find().sort({ First_Name: 1 })
        res.status(200).json({ message: assOrder })
    } catch (error) {
        res.json({ message: error })
    }
}
exports.orderBylastname = async (req, res) => {
    try {
        assOrder = await db.find().sort({ Last_Name: 1 })
        res.status(200).json({ message: assOrder })
    } catch (error) {
        res.json({ message: error })
    }
}
exports.orderByid = async (req, res) => {
    try {
        assOrder = await db.find().sort({ _id: 1 })
        res.status(200).json({ message: assOrder })
    } catch (error) {
        res.json({ message: error })
    }
}
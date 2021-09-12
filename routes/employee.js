const router = require('express').Router()
const { authenticateToken } = require('../Auth/jwt')
const { createEmployee, searchEmp, getAllusers, updateUser, deleteUser, orderByname, orderBylastname, orderByid, login } = require('../controller/employee')

router.get("/search", searchEmp)
router.get('/orderByname', orderByname)
router.get('/orderBylastname', orderBylastname)
router.get('/orderByid', orderByid)
router.get("/users",authenticateToken, getAllusers)

router.post("/sign", createEmployee)
router.post("/login", login)

router.put("/update/:id", updateUser)

router.delete("/delete/:id", deleteUser)


module.exports = router
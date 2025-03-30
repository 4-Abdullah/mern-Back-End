const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController')
const ROLES_LIST = require('../../config/roles_list')
const verfiyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.createNewEmployee)
    .put(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.updateEmployee)
    .delete(verfiyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router

const express = require('express')

const controller = require('../controllers/userController')

const router = express.Router()

const path  = 'user'


router.get(
    `/${path}`,
    controller.getUsers
)

router.post(
    `/${path}`,
    controller.addUser
);

router.put(
    `/${path}/:id`,
    controller.updateUser
);

router.delete(
    `/${path}/:id`,
    controller.deleteUser
);

module.exports = router
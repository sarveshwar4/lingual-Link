const express = require('express');
const router = express.Router();
const {createUser, getUser, updateUser, deleteUser} = require('../../controller/user-controller'); 

router.post('/user/create',createUser);
router.get('/user/:id', getUser);
router.patch('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);

module.exports = router;
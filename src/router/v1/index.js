const express = require('express');
const router = express.Router();
const {createUser, getUser, updateUser, deleteUser} = require('../../controller/user-controller'); 
const {createConnection, reviewConnection} = require('../../controller/connection-controller');


router.post('/user/create',createUser);
router.get('/user/:id', getUser);
router.patch('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);


router.post('/connections/:fromUserId/:toUserId/:status',createConnection);
router.patch('/connections/review/:userId/:connectionId/:status', reviewConnection);

module.exports = router;
const UserService = require('../service/user-service');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const response = await userService.createUser(userData);
        res.status(201).json({
            data:response,
            message: 'User created successfully',
            success: true,
            err: {},
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            message: "Something went wrong while creating user",
            success: false,
            err: error,
        });
    }
};

const getUser = async (req, res) => {
    try{
      const userId = req.params.id;
      const response = await userService.getUser(userId);       
      return res.status(200).json({
          data: response,
          message: 'User fetched successfully',
          success: true,   
          err:{}, 
        });
    }catch(error){
        res.status(500).json({
            data: {},
            message: "Something went wrong while fetching user",
            success: false,
            err: error,
        });
    }
}

const updateUser = async (req, res) => {
    try { 
        const userId = req.params.id;
        const userData = req.body;
        const response = await userService.updateUser(userId, userData);    
        return res.status(200).json({
            data: response,
            message: 'User updated successfully',
            success: true,
            err: {},
        });
      }
    catch(error){
        res.status(500).json({
            data: {},
            message: "Something went wrong while updating user",
            success: false,
            err: error,
        });
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const response = await userService.deleteUser(userId);
        return res.status(200).json({
            data: response,
            message: 'User deleted successfully',
            success: true,
            err: {},
        });
    }catch(error){
        res.status(500).json({
            data: {},
            message: "Something went wrong while deleting user",
            success: false,
            err: error,
        });
    }   
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}
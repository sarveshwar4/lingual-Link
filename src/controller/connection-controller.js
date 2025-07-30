const ConnectionService = require("../service/connection-service"); 

const connectionService = new ConnectionService();

const createConnection = async(req, res)=>{
    try{
        const { fromUserId, toUserId, status} = req.params;
        const response = await connectionService.sendConnectionRequest(fromUserId, toUserId, status);
        return res.status(201).json({
            data:response,
            message: "Connection request sent successfully",
            success: true,
            err:{}
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            message: "Error creating connection",
            success: false,
            err:error.message
        });
    }
};
const reviewConnection = async(req, res)=>{
    try{
        const {userId, connectionId, status} = req.params;
        console.log(userId, connectionId, status)
        const response = await connectionService.reviwConnectionRequest(userId, connectionId, status);
        return res.status(201).json({
            data:response,
            message: `Connection request ${response.status} successfully`,
            success: true,
            err:{}
        });
    }catch(error){
        res.status(500).json({
            data:{},
            message: "Error creating connection",
            success: false,
            err:error.message
        });
    }
}


const getAllConnection = async(req, res)=>{
    try{
        const {userId} = req.params;
        const response = await connectionService.getALLConnection(userId);
        return res.status(201).json({
            data:response,
            message: `Connection request ${response.status} successfully`,
            success: true,
            err:{}
        });
    }catch(error){
        res.status(500).json({
            data:{},
            message: "Error creating connection",
            success: false,
            err:error.message
        });
    }
}

const getPendingConnection = async(req, res)=>{
    try {
        const {userId} = req.params;
        const response = await connectionService.getWhomSentConnectionRequest(userId);
        return res.status(200).json({
            data: response,
            message: "Pending connections fetched successfully",
            success: true,
            err: {}
        });
    } catch (error) {
        res.status(500).json({
            data:{},
            message: "Error fetching pending connections",
            success: false,
            err:error.message
        });
        
    }
}

module.exports = {
    createConnection,
    reviewConnection,
    getAllConnection,
    getPendingConnection
}
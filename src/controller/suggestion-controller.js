const UserSuggestionService = require('../service/user-suggestion-service.js');

const userSuggestion = new UserSuggestionService();

const  friendsSuggestions = async (req, res)=>{
    try {
        const {userId} = req.params;
        const response = await userSuggestion.friendSuggestion(userId);
        return res.status(200).json({
            data:response,
            success:true,
            message:'Suggestions get Successfully...',
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data: {},
            message: "Something went wrong while fetching the suggestions",
            success: false,
            err: error,
        });
    }
}


module.exports =  {
    friendsSuggestions
}
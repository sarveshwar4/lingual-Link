const UserRepository = require('../repository/user-repo');
const ConnecctionRepo = require('../repository/connection-repo');
class UserSuggestionService{
    constructor(){
       this.userRepository = new UserRepository();
       this.connectionRepo = new ConnecctionRepo();
    }
    async friendSuggestion(userId){
        try{
          const userDetails = await this.userRepository.get(userId);
          const {native, learning} = userDetails;
          const connections = await this.connectionRepo.getAll(userId);
          const mySet = new Set();
          connections.forEach((connection) => {
            if (connection.fromUserId.toString() !== userId.toString()) {
              mySet.add(connection.fromUserId.toString());
            } 
            if (connection.toUserId.toString() !== userId.toString()) {
              mySet.add(connection.toUserId.toString());
            }
          });
          const connectedUserIds = Array.from(mySet);
          const excludeIds = connectedUserIds.length > 0 ? connectedUserIds : [userId];
          const user  = await this.userRepository.getUserSuggestion(native, learning,excludeIds);
          if(user.length === 0){
            throw new Error("No user found");
          }
          return user;
        }catch(error){
        throw error;
        }
    }
}

module.exports = UserSuggestionService;
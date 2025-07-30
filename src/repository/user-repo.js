const User = require('../models/user');

class UserRepository {
  

  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }


  async get(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }


  async update(id, userData) {
    try {
      const user = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }


  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  async getUserSuggestion(native, learning, excludeIds) {
    try {

      const response = await User.find({
        // $or: [
          // {
            $and: [
              { native: learning },
              { learning: native },
              { _id: { $nin: excludeIds } }
            ]
          },
      //     {
      //       //  native: learning,
      //       // _id: { $nin: excludeIds }
      //     // }
      //   // ]
      // }
    ).select('_id name email native learning');

    const looseSuggestion = await User.find({
          native: learning,
         _id: { $nin: excludeIds }
    }).select('_id name email native learning');
    
      const finalResponse = [...response, ...looseSuggestion];
      return finalResponse;
    } catch (error) {
      console.error("Error in getUserSuggestion:", error);
      throw new Error("Something went wrong during fetching the user suggestions");
    }
  }
}  

module.exports = UserRepository;

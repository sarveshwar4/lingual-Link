const { connect } = require("mongoose");
const Connection = require("../models/connections");

class ConnectionRepository {
  async create(data) {
    try {
      const connection = await Connection.create(data);
      return connection;
    } catch (error) {
      throw new Error("Error creating connection: " + error.message);
    }
  }
  async getConnectionById(connnectionId) {
    try {
      const connection = await Connection.findOne({ _id: connnectionId });
      if (!connection) {
        throw new Error("Connection not found");
      }
      return connection;
    } catch (error) {
      throw new Error("Error fetching connection: " + error.message);
    }
  }
  async updateConnection(id, data) {
    try {
      const connection = await Connection.findByIdAndUpdate(id, data, {
        new: true,
      });
      return connection;
    } catch (error) {
      throw new Error("Error updating connection: " + error.message);
    }
  }
  async deleteConnection(id) {
    try {
      const response = await Connection.findByIdAndDelete(id);
      if (!response) {
        throw new Error("Connection not found");
      }
    } catch (error) {
      throw new Error("Error deleting connection: " + error.message);
    }
  }

  async getAll(userId){
    try {
      const connections = await Connection.find({
        $or: [
          { fromUserId: userId},
          { toUserId: userId}
        ]
      }).select('fromUserId toUserId');
      return connections;
    } catch (error) {
      
    }
  }
  async getAllConnection(userId) {
    try {
      const connections = await Connection.find({
        $or: [
          { fromUserId: userId},
          { toUserId: userId,}
        ],
        status: "ACCEPTED"
      });
  
      return connections;
    } catch (error) {
      console.error("Error in getAllConnection:", error);
      throw error;
    }
  }


  async getpendingConnections(userId){
    try {
      const response = await Connection.find({
        toUserId: userId,
        status: "PENDING"
      }).populate('fromUserId', 'firstName lastName email photoUrl ');
      return response;
    } catch (error) {
      console.log("Something went wrong in repo layer");
      throw error;
    }
  }
  
}
module.exports = ConnectionRepository;

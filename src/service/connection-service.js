const Connection = require("../models/connections");
const mongoose = require("mongoose");
const ConnectionRepository = require("../repository/connection-repo");
const UserRepository = require("../repository/user-repo");
class ConnectionService {
  constructor() {
    this.connectionRepository = new ConnectionRepository();
    this.userRepository = new UserRepository();
  }
  async sendConnectionRequest(fromUserId, toUserId, status) {
    try {
      if (fromUserId === toUserId) {
        throw new Error("You cannot send a connection request to yourself");
      }
      const connectionPresent = await Connection.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if(connectionPresent){
        throw new Error("No further can be send");
      }
      const user = await this.userRepository.get(toUserId);
      if (!user) {
        throw new Error("User not found");
      }
      const connectionData = await this.connectionRepository.create({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      return connectionData;
    
    } catch (error) {
      throw error;
    }
  }
  async reviwConnectionRequest(UserId, connectionId, status) {
    try {
      if (!["ACCEPTED", "REJECTED"].includes(status)) {
        throw new Error("Invalid status for connection request");
      }
      const reverse = await this.connectionRepository.getConnectionById(
        connectionId
      );
      console.log(reverse)
      if (!reverse) {
        throw new Error("Connection not found");
      }     
      if (reverse.toUserId.toString() !== UserId.toString()) {
        throw new Error("You cannot review this connection request");
      }
      if (reverse.status === "ACCEPTED") {
        throw new Error(`Connected Alerady ${reverse.status}`);
      }
      if (reverse.status !== "PENDING") {
        throw new Error(`Connection request is already ${reverse.status}`);
      }

      reverse.status = status;
      await reverse.save();
      return reverse.status === "ACCEPTED"
        ? "Connection request accepted"
        : "Connection request rejected";
    } catch (error) {
      throw error;
    }
  }

  async getALLConnection(userId){
        try {
          const connections = await this.connectionRepository.getAllConnection(userId);
          return connections;
        } catch (error) {
          throw error;
        }
  }

}

module.exports = ConnectionService;

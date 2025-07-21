const UserRepository = require('../repository/user-repo');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async createUser(userData) {
        try {
            return await this.userRepository.create(userData);
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
    async getUser(id) {
        try {
            return await this.userRepository.get(id);
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }
    async updateUser(id, userData) {
        try {
            return await this.userRepository.update(id, userData);
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }
    async deleteUser(id) {
        try {
            return await this.userRepository.delete(id);
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = UserService;
const mongoose = require('mongoose');
const connecctionSchema = new mongoose.Schema({
      fromUserId:{
         type : mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      toUserId:{
           type:mongoose.Schema.Types.ObjectId,
           ref: 'User',
      },
      status:{    
         type:String,
         enum: ['PENDING', 'ACCEPTED', 'REJECTED','IGNORED'],
      }
});

const Connection = mongoose.model('Connection', connecctionSchema);
module.exports = Connection;
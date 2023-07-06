import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: { 
      type: String,
      require: true 
    },
    last_name: {
      type: String,
      require: true
    },
    email: { 
      type: String,
      require: true
    },
    password: { 
      type: String,
      require: true
    },
    isAdmin: {
      type: Boolean,
      default: false 
    },
    token: {type: String}
  });
  
  const Users = mongoose.model('Users', usersSchema);

  export default Users;

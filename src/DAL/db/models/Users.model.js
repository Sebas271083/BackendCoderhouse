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
    }
  });
  
  const Users = mongoose.model('Users', usersSchema);

  export default Users;

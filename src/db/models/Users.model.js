import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String},
    password: { type: String}
  });
  
  const Users = mongoose.model('Users', usersSchema);

  export default Users;

import mongoose from 'mongoose'
// mongoose.set('strictPopulate', false);
const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  mobile:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
})

// export default mongoose.model('User', userSchema)
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
import mongoose, { Types }  from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next(); // ✅ use return
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });



userSchema.pre("save", async function() {
  if (!this.isModified("password")) return; // password unchanged
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema)
export default User;
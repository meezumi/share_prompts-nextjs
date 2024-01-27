import { Schema, model, models } from "mongoose";

// mongoose is helping us interact with the mongoDB database

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists :/"],
    // if it fails
    required: [true, "Email is required :/"],
  },

  username: {
    type: String,
    required: [true, "We need a name for you :)"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },

  image: {
    type: String,
  }
});

// The 'models' object is provided by the mongoose library and stores all the registered models. 

// If a model named 'User'already exists in the 'models' object, it assigns that existing model to the 'User' variable. This prevents redefining the model and ensures that the existing model is reused.

// if a model named 'User' does not exist in the "models" object, the "model" function from mongoose is called to create a new model. The newly created model is then assigned to the "user" variable.

const User = models.User || model('User', UserSchema);

export default User;
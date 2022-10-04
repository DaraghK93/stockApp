const mongoose = require('mongoose')

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}; 

// User schema definition
const UserSchema = new mongoose.Schema(
  {
    // Validation examples: https://mongoosejs.com/docs/validation.html, https://vegibit.com/mongoose-validation-examples/ , https://thewebdev.info/2022/03/16/how-to-validate-email-syntax-with-mongoose/
    name: {type: String, trim: true, required: true},
    username: {type: String, trim: true,required: true},
    
    email: {
      type: String, 
      trim: true, 
      unique: true,
      required: true,
      validate: [validateEmail, "Please enter a valid email address"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address",]
    },
    
    password: {type: String, trim: true, required: true},
    image: {type: String},
    bio: {type: String}
  },
  {collection: 'user-data'},
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  {timestamps: true}
)

// Registers schema with Mongoose, can now be accessed using "mongoose.model('UserData')"
const user = mongoose.model('UserData', UserSchema)

module.exports = user
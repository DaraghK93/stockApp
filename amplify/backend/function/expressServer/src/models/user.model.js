const mongoose = require('mongoose')
const {Schema} = mongoose
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

// User schema definition
const UserSchema = new mongoose.Schema(
  {
    // Validation examples: https://mongoosejs.com/docs/validation.html, https://vegibit.com/mongoose-validation-examples/ , https://thewebdev.info/2022/03/16/how-to-validate-email-syntax-with-mongoose/
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    username: { type: String, trim: true, required: true, unique: true },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please enter a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    overeighteen: { type: Boolean, trim: true, required: true, default: true },
    password: { type: String, trim: true, required: true },
    location: { type: String, trim: true },
    image: { type: String },
    bio: { type: String },
    portfolios: [{type: Schema.Types.ObjectId, ref: "PortfolioData"}],
    leagues: [{type: Schema.Types.ObjectId, ref: "league" }],
    resetPasswordToken: {type: String,required: false},
    resetPasswordExpires: {type: Date,required: false}
  },
  { collection: 'users' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

/// hashPassword on save ///
// Description:
//  This function is called on the "save" action for the user schema
//  When a new user is created there password has to be hashed 
//  It should also be hashed when a password is changed  
//  Function s called on user so "this" can be used to access attributes 
UserSchema.pre('save', async function (next) {
  // If the password is not modified do not run this, call next middleware 
  if(!this.isModified('password')){
      next();
  }else{
      // salt is a random string used to hash the password 
      let salt = await bcrypt.genSalt(10);
      // now hash the passowrd using the salt 
      this.password = await bcrypt.hash(this.password,salt);
  }
})

module.exports = mongoose.model('UserData', UserSchema)

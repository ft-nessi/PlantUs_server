const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const rangerSchema = new Schema(
  {
    isUser: Boolean,
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    motivation: String,
    imageUrl: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ranger = model("ranger", rangerSchema);

module.exports = Ranger;

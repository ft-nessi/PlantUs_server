const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const treeSchema = new Schema(
  {
    treename: {
      type: String,
      default: 'New tree'
    },
    kind: {
        type: String,
        enum: ["Spruce", "Oak", "Pine", "AhornEuropean beech", "Maple tree"]
    },
    location:{
      type: {
        type: String, 
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true
      }},
    plantedDate: Date,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Tree = model("tree", treeSchema);

module.exports = Tree;

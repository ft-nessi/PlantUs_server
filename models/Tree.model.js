const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const treeSchema = new Schema(
  {
    treename: {
      type: String,
      default: "New tree",
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    rangerId: {
      type: Schema.Types.ObjectId,
      ref: "ranger",
      // index: true,
      // required: true,
      // sparse: true,
    },
    //chosenKinds
    kind: {
      type: String,
      enum: ["Spruce", "Oak", "Pine", "AhornEuropean beech", "Maple tree"],
    },
    // plantedKind: {
    //   type: String,
    //   enum: ["Spruce", "Oak", "Pine", "AhornEuropean beech", "Maple tree"],
    // },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinatesX: {
        type: String,
        required: true,
      },
      coordinatesY: {
        type: String,
        required: true,
      },
    },
    plantedDate: Date,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Tree = model("tree", treeSchema);

module.exports = Tree;

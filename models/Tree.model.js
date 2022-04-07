const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const treeSchema = new Schema(
  {
    treename: {
      type: String,
    },
    kind: {
        type: String,
        enum: ["Buche", "Eiche", "Fichte", "Ahorn"]
    },
    plantedDate: Date,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ranger = model("Ranger", rangerSchema);

module.exports = Ranger;

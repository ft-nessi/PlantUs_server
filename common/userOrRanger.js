const User = require("../models/User.model");
const Ranger = require("../models/Ranger.model");

const userOrRanger = (user) => user.isUser ? User : Ranger;

module.exports = userOrRanger;

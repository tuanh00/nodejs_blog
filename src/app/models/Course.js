const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id: { type: Number, },
    name: { type: String, maxLength: 255, required: true },
    desc: { type: String, maxLength: 500, required: true },
    img: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, maxLength: 255, required: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

mongoose.plugin(URLSlug);

Course.plugin(autoIncrement);

Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);

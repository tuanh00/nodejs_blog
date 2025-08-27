const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    desc: { type: String, maxLength: 500, required: true },
    img: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, maxLength: 255, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(URLSlug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);

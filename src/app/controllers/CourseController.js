const Course = require("../models/Course");
const { multipleMongooseToObject } = require('../../util/mongoose')

class CourseController {

  //[GET] /courses/:slug
  show(req, res) {
    res.send("show details");
  }
}
module.exports = new CourseController();

const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  //[GET] /me/stored-courses -> only NOT deleted (overrideMethods handles it)
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render("me/stored-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  // [GET] /me/trash-courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true }) // <— explicitly filter deleted:true
      .select("name deleted deletedAt") // handy to see flags
      .lean()
      .then((courses) => res.render("me/trash-courses", { courses }))
      .catch(next);
  }
}
module.exports = new MeController();

const Course = require('../models/Course');

class SiteController {

    //[GET] /
    async index(req, res) {
        try {
            const courses = await Course.find({}).lean();
            return res.json(courses);
        } catch (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        
        //res.render('home');
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
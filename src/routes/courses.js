var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

//CRUD
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
//soft delete to Trash
router.delete('/:id', courseController.delete);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDelete);

router.get('/:slug', courseController.show);


module.exports = router;

var express = require('express');
var router = express.Router();
var debug = require('debug')('infeedo:taskController');
let taskService = require('../service/taskService');
let utils = require('../bin/util');

router.get('/:id', function(req, res, next) {
    taskService.getOneById(req.params.id).then((data) => {
        debug(data);
        res.json(data);
    }).catch(err => {
        res.status(400).json(err);
    })
});

router.post('/', function (req, res, next) {
  taskService.createNewTask(req.body).then( (id)=> {
      debug("Task Created", id);
      taskService.getOneById(id).then((data) => {
          debug(data);
          res.json(data);
      }).catch(err => {
        res.status(400).json(err);
      })
  })
});

router.put('/:id', async function (req, res, next) {
    if(!await utils.isValidStatus(req.body.status)) {
        res.status(402).json({
            "Error" : "Invalid Status, Status can be 'open', 'close', 'continue'"
        })
    } else {

        taskService.getOneById(req.params.id).then((data) => {
            debug(data);
            taskService.updateTask(req.params.id, req.body.status).then( (task)=> {
                debug("Task updated", task);
                res.json(task);
            })
        }).catch(err => {
            res.status(400).json(err);
        })
    }
});


router.get('/report/metrics', function (req, res, next) {
    taskService.getMetrics(req.body).then(async (data) => {
        debug(data);
        data = await utils.formatResponse(data)
        res.json(data);
    }).catch(err => {
        debug("Error", err)
        res.status(400).json(err);
    })
});

router.get('/all/:limit/:page', function (req, res, next) {
    debug("----", req.params)
    taskService.getAllPagination(req.params.limit, req.params.page).then( rows => {
        debug(rows);
        res.json(rows);
    }).catch(err => {
        debug("Error", err);
        res.status(400).json(err);
    })
});

module.exports = router;

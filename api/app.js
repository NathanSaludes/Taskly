const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Route handlers

// List Routes

/**
 * GET /lists
 * Purpose: get all lists
*/
app.get('/lists', (req, res) => {
    // return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    })
});

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
    // create a new list and return the new list document back to the user which includes the id
    // the list information (fields) will be passed in via the json request body
    let title = req.body.title;
    
    let newList = new List({ title });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
});


/**
 * PATCH /lists/:id  
 * Purpose: Update a specified list
 */
app.patch('/lists/:id', (req, res) => {
    // update the specified list (list document with id in the URL) with the new values specified via the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});


/**
 * DELETE /lists/:id  
 * Purpose: Delete a specified list
 */
app.delete('/lists/:id', (req, res) => {
    // delete the specified list (document with id in the url)
    List.findByIdAndRemove({ _id: req.params.id }).then((document) => {
        // return the currently removed/deleted document
        res.send(document);
    })
});


/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
app.get('/lists/:listId/tasks', (req, res) => {
    // return the tasks that belong to a specific list (specified by listID)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
});

/**
 * GET /lists/:listId/tasks/:taskId
 * Purpose: Get a specific task from a list
 */
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    // get a task from a list specified by taskId
    Task.findOne({ 
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
}); 

/**
 * POST /lists/:listId/tasks
 * Purpose: create a new task in a specific list
 */
app.post('/lists/:listId/tasks', (req, res) => {
    // create a new task in a list specified by listId
    let newTask = new Task({
        _listId: req.params.listId,
        title: req.body.title
    })
    newTask.save().then((document) => {
        // return the newly created task
        res.send(document);
    })
});

/**
 * PATCH /list/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // update an existing task (specified by taskId)
    Task.findOneAndUpdate({ 
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: remove a specific task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ 
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((document) => {
        res.send(document);
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
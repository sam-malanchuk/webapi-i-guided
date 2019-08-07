// libraries
const express = require('express');

// other files
const db = require('./data/hubs-model.js');

// global objects
const server = express();

// middleware - make sure to add this to make post requests
server.use(express.json());

// request handler

// GET /
server.get('/', (req, res) => {
    res.send('Hello world');
});

// GET /now
server.get('/now', (req, res) => {
    const date = new Date().toISOString();
    // send back a timestamp
    res.send(date);
});

// GET /hubs
server.get('/hubs', (req, res) => {
    db.find()
        .then(hubs => {
            res.json(hubs);
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
});

// POST /hubs
server.post('/hubs', (req, res) => {
    const newHub = req.body;
    db.add(newHub)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to create new hub'
            });
        });
});

// DELETE /hubs/:id
server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deletedHub => {
            if(deletedHub) {
                res.json(deletedHub);
            } else {
                res.status(404).json({
                    message: 'invalid hub ID'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to destroy hub'
            });
        });
});

// PUT /hubs/:id
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.json(updated);
            } else {
                res.status(404).json({
                    message: 'invalid hub ID'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to update hub'
            });
        });
});

// GET /hubs/:id
server.get('/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(hub => {
            if (hub) {
                res.json(hub);
            } else {
                res.status(404).json({
                    message: 'invalid hub ID'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err
            });
        });
})

// last step in any server code
server.listen(4000, () => {
    console.log('Server is running on port 4000...');
});
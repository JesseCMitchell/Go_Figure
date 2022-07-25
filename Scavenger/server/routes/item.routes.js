const ItemController = require('../controllers/item.controller');

module.exports = app => {
    app.get('/api/items', ItemController.findAllItems);
    app.post('/api/items', ItemController.createItem);
    app.get('/api/items/:_id', ItemController.findOneItem);
    app.put('/api/items/:_id', ItemController.updateOneItem);
    app.delete('/api/items/:_id', ItemController.deleteItem);
}
const ProductController = require('../controllers/product.controller');

module.exports = app => {
    app.get('/api/products', ProductController.findAllProducts);
    app.post('/api/products', ProductController.createProduct);
    app.get('/api/products/:_id', ProductController.findOneProduct);
    app.put('/api/products/:_id', ProductController.updateOneProduct);
    app.delete('/api/products/:_id', ProductController.deleteProduct);
}
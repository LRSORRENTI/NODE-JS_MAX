const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// Here is where we add the dynamic route controller

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, myProduct =>{
      console.log(product)
      res.render('shop/product-detail.ejs', 
      {product: myProduct, 
        pageTitle: myProduct.title,
      path: '/products' })
    });
    // remember inside of routes, productId 
    // is the name we gave the router.get('/products/productId')
    //  res.redirect('/');
  };


exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

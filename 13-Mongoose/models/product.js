// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;


const mongoose = require('mongoose');

// The below constructor allows us to create 
// new schemas 
const Schema = mongoose.Schema;


// Then we can pass in a JS object to the 
// constructor new Schema, and inside of the 
// object we define how the product should 
// blueprint
const productSchema = new Schema({
    title: {
        type: String,
        required: true
        // What we're doing here is saying
        // every product requires a title, 
        // and the title must be a string
    },
    price: {
    type: Number,
    required: true
},
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
     },
     userId: {
        type: Schema.Types.ObjectId,
        // note that what we pass into 
        // ref below must match
        // module.exports = mongoose.model('User', userSchema)
        // the argument for mongoose.model from user schema
        ref: 'User',
        required: true
        // And now we have a relation set up, now 
        // we can go back into user.js and add 
        // a reference to the items array, productId
     }
   }
);

// The above defines our product blueprint
// but now we need to use a method that 
// mongoose has called model() and what 
// model does is behind the scenes is 
// connect a blueprint like the one above 
// with a name, we'll pass in 'Product', the 
// second argument is our schema, which is 
// productSchema from above

module.exports = mongoose.model('Product', productSchema)

require('dotenv').config({path: 'C:/Users/lrsor/Desktop/Programming/MAX-NODE/NODE-JS_MAX/15-Authentication/util/my.env'})


const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const csrf = require('csurf')

const flash = require('connect-flash');
// now we need to register our error session package
// connect-flash

const errorController = require('./controllers/error');
const User = require('./models/user');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@maxnode.mppqkhv.mongodb.net/shop`


const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);
// important to note, these packages need to be 
// initialized after the session is created 
app.use(flash)

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// After we get the user, but before the routes
// is where we'll use CSRF 

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Luke',
    //       email: 'email@myNewEmail.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    
    // We can now comment out the above, because, 
    // we have our signup, auth and user creation
    // flow
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
// const flash = require('connect-flash');

// const errorController = require('./controllers/error');
// const User = require('./models/user');

// const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });
// const csrfProtection = csrf();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );
// app.use(csrfProtection);
// app.use(flash());

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);

// app.use(errorController.get404);

// mongoose
//   .connect(MONGODB_URI)
//   .then(result => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

require('dotenv').config({path: './util/my.env'})

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

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
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
    // The above check is important, 
    // if we omit the above,  and 
    // we try to find a user without 
    // the session object, which in turn 
    // crashes our app
  }
  User.findById(req.session.user._id)
    .then(user => {
      // But we may still fail to find the 
      // user, even if we have it stored in a 
      // session
      if(!user){
        // So above, if user doesn't exist,
        // invoke next
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      // console.log(err)
      // instead of just logging it we'll 
      // use the throw new Error syntax, which 
      // has the advantage 
      // throw new Error(err)
      // but inside of these then catch async code 
      // blocks we need to use next instead, 
      // since we can avoid infinite loops triggered by 
      // error handling middlware
      next(new Error(err))
    });
});


// need to move this csrf token creation jst below app.useFlash()
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500)

app.use(errorController.get404);

app.use((error, req, res, next) => {
  // we can use express built in error handling 
  // middleware, express can recognize that 
  // when we call next with an error passed to it
  // and if we have more than one error handling 
  // middleware they'll be called top to bottom, just 
  // like normal middleware
  // res.status(error.httpStatusCode).render(...)
  // res.redirect('/500')
  res.status(500).render('500', {
    pageTitle: 'Error occured',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
})

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

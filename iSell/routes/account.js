/**
 * Created by Jure on 12. 03. 2017.
 */

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');


let User = require('../models/user');
let express = require('express');
let router = express.Router();

/* for encrypting passwords */
let bcrypt = require('bcrypt');
const saltRounds = 10;

let poljeUporanikov = [];
let prijavljeniUporabniki = [];

let config = require('../knexfile');
let knex = require('knex')(config.development);
let bookshelf = require('bookshelf')(knex);

let UserModel = bookshelf.Model.extend({tableName: 'user'});

poljeUporanikov.push('jure');

router.post('/login', (req, res, next) => {
  // console.log(req.body.username);
  new UserModel()
      .query({where: {'username': req.body.username}})
      .fetch()
      .then((data) => {
        // console.log(data);
        if (data == null) {
          res.status(401).json({status: '401'});
          console.log("401 ni uspelo 1 else")
        } else {
          // console.log("pred-------");
          // console.log(req.body.password);
          // console.log(data.attributes.password);
          bcrypt.compare(req.body.password, data.attributes.password,
                         function(err, res) {
                           // console.log("po-------");
                           // console.log(req.body.password);
                           // console.log(res);
                           // console.log(data.attributes.password);

                           if (res) {
                             var myToken = jwt.sign({username: req.body.username}, 'iSell 4 ever');
                             res.status(200).json(myToken);
                             console.log("200 vse ok!")
                           } else {
                             res.status(401).json({
                               status: '401',
                             });
                             console.log("401 ni uspelo 2 else")
                           }
                         });
        }
      });
});

router.get('/logout', (req, res, next) => {
  prijavljeniUporabniki.splice(prijavljeniUporabniki.indexOf(req.body.username), 1);
  res.json({
    status: '200',
  });
});

router.post('/register', (req, res, next) => {
  console.log(req.body);
  if (req.body == null || req.body.username == null ||
      req.body.password == null || req.body.email == null) {
    res.json({status: '200', accepted: false});
  } else {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;


    // checking if username or email already exist
    new UserModel()
        .query({where: {'username': username}, orWhere: {'email': email}})
        .fetch()
        .then(function(model) {
          if (model == null) {  // if model is null username and email don't
                                // exist in database
            // encrypting password and saving user into database
            bcrypt.hash(password, saltRounds, function(err, hash) {
              new UserModel()
                  .save({username: username, password: hash, email: email})
                  .then((data) => {
                    console.log(data);
                    data.info = 'success';
                    res.json(data);
                  });
            });
          } else if (model.get('username') == username) {
            res.json({status: '400', info: 'username_exists'});
          } else if (model.get('email') == email) {
            res.json({status: '400', info: 'email_exists'});
          }
        });
  }
});

router.get('/profile:id', (req, res, next) => {
  let user = poljeUporanikov.find(x => x.id === req.params.id);
});

module.exports = router;

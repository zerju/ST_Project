/**
 * Created by Jure on 12. 03. 2017.
 */
let Auction = require('../models/auction');

let Bid = require('../models/bid');
let express = require('express');
let router = express.Router();

let config = require('../knexfile');
let knex = require('knex')(config.development);
let bookshelf = require('bookshelf')(knex);
var _ = require('lodash');
var busboy = require('connect-busboy');  // middleware for form/file upload
var path = require('path');              // used for file path
var fs = require('fs-extra');
var fs = require('fs');  // File System - for file manipulation
var multer = require('multer');
var nodemailer = require('nodemailer');



let bids = [];

let AuctionModel = bookshelf.Model.extend({tableName: 'auction'});

let BidModel = bookshelf.Model.extend({tableName: 'auction_bids'});

let PictureModel = bookshelf.Model.extend({tableName: 'pictures'});

router.post('/create', (req, res, next) => {
  let date_from = req.body.date_from;
  let date_to = req.body.date_to;
  let name = req.body.auction_name;
  let item = req.body.auction_item;
  let user_id = req.body.auction_user_id;
  let description = req.body.item_description;
  let price = req.body.price;
  let category = req.body.category;
  let lat = req.body.lat;
  let long = req.body.long;

  new AuctionModel()
      .save({
        date_from: date_from,
        date_to: date_to,
        auction_name: name,
        auction_item: item,
        user_id: user_id,
        item_description: description,
        price: price,
        category: category,
        lat: lat,
        long: long
      })
      .then((data) => {
        if (data === null || data === undefined) {
          res.json({status: '500'});
        } else {
          res.json({status: '200','auction_id':data.attributes.id});
        }
      });

});

router.post('/edit', (req, res, next) => {
  let id = req.body.id;
  let date_from = req.body.date_from;
  let date_to = req.body.date_to;
  let name = req.body.auction_name;
  let item = req.body.auction_item;
  let user_id = req.body.auction_user_id;
  let description = req.body.item_description;
  let price = req.body.price;
  let category = req.body.category;
  let lat = req.body.lat;
  let long = req.body.long;

  new AuctionModel({id: id})
      .save(
          {
            date_from: date_from,
            date_to: date_to,
            auction_name: name,
            auction_item: item,
            user_id: user_id,
            item_description: description,
            price: price,
            category: category,
            lat: lat,
            long: long
          },
          {patch: true})
      .then((data) => {
        res.json({status: '200'});
      });


});

// kličema za edit in prikaz
router.get('/details', (req, res, next) => {
  let id = req.query.id;
  let respData = [];
  let auction = {};

  new AuctionModel().query({where: {'id': id}}).fetch().then((data) => {
    if (data === null || data === undefined) {
      res.json({status: '500'});
    } else {
      auction = data.toJSON();
      console.log(auction.id);
      new PictureModel().query({where: {'auction_id':data.attributes.id}}).fetchAll().then((data)=> {
        if(data === null || data === undefined || data.models < 1){
          respData = [];
          res.json({'status': '200',data: auction, pictures: {} });
        }else{
          data.models.forEach(function(model) {
            respData.push(model.attributes);
          });
          res.json({
            'status': '200',
            data: auction,
            pictures: JSON.parse(JSON.stringify(respData))
          });
        }
      });
    }
  });
});

router.get('/search', (req, res, next) => {
  let searchTerm = '%' + req.query.search + '%';
  let respData = [];
  console.log(searchTerm);

  new AuctionModel()
      .query(function(qb) {
        qb.where('auction_item', 'LIKE', searchTerm)
            .orWhere('category', 'LIKE', searchTerm)
            .orWhere('auction_name', 'LIKE', searchTerm);
      })
      .fetchAll()
      .then((data) => {
        if (data === null || data === undefined || data.models.length < 1) {
          res.json({status: '500'});
        } else {
          data.models.forEach(function(model) {
            respData.push(model.attributes);
          });
          res.json({status: '200', data: JSON.parse(JSON.stringify(respData))});
        }
      });
});

router.get('/byLocation', (req, res, next) => {
  let lat = req.query.lat;
  let long = req.query.long;
  let respData = [];

  new AuctionModel()
      .query(function(qb) {
        qb.whereBetween('lat', [
            Number(lat) - 1, Number(lat) + 1
          ]).whereBetween('long', [Number(long) - 1, Number(long) + 1]);
      })
      .fetchAll()
      .then((data) => {
        if (data === null || data === undefined || data.models.length < 1) {
          res.json({status: '500'});
        } else {
          data.models.forEach(function(model) {
            respData.push(model.attributes);
          });
          res.json({status: '200', data: JSON.parse(JSON.stringify(respData))});
        }
      });
});

router.get('/byCategory', (req, res, next) => {
  let cat = req.query.category;
  let respData = [];

  new AuctionModel()
      .query(function(qb) {
        qb.where('category', '=', cat);
      })
      .fetchAll()
      .then((data) => {
        if (data === null || data === undefined || data.models.length < 1) {
          res.json({status: '500'});
        } else {
          data.models.forEach(function(model) {
            respData.push(model.attributes);
          });
          res.json({status: '200', data: JSON.parse(JSON.stringify(respData))});
        }
      });
});

router.delete('/delete', (req, res, next) => {
  let idDelete = req.query.delete;
  new AuctionModel({id: idDelete}).destroy().then((data) => {
    res.json({status: '200'});
  });
});

router.post('/placeBid', (req, res, next) => {
  let userId = req.body.userId;
  let auctionId = req.body.auctionId;
  let value = req.body.value;

  new BidModel()
      .save({user_id: userId, auction_id: auctionId, 'value': value})
      .then((data) => {
        if (data === null || data === undefined) {
          res.json({status: '500'});
        } else {
          res.json({status: '200'});
        }
      });
});

router.get('/highestBid', (req, res, next) => {

  let auction_id = req.query.auction_id;
  let respData = [];

  new BidModel()
      .where('auction_id', '=', auction_id)
      .fetchAll()
      .then((data) => {
        if (data === null || data === undefined) {
          res.json({'status': 500});
        } else {
          // console.log(_.maxBy(data.toJSON(), 'value'));
          data.models.forEach(function(model) {
            respData.push(model.attributes);
          });
          max_value = _.maxBy(respData, 'value');
          res.json({'status': 200, 'data': max_value});
        }
      });

});


router.get('/myAuctions', (req, res, next) => {
  let user_id = req.query.user_id;
  let respData = [];

  new AuctionModel().where('user_id', '=', user_id).fetchAll().then((data) => {
    if (data === null || data === undefined || data.models.length < 1) {
      res.json({'status': 200});
    } else {
      data.models.forEach(function(model) {
        respData.push(model.attributes);
      });
      res.json({'status': 200, 'data': JSON.parse(JSON.stringify(respData))});
    }
  });
});

router.get('/myBids', (req, res, next) => {
  let user_id = req.query.user_id;
  let respData = [];

  new BidModel()
      .query(function(qb) {
        qb.where('user_id', '=', user_id).groupBy('auction_id');
      })
      .fetchAll()
      .then((data) => {
        if (data === null || data === undefined || data.models.length < 1) {
          res.json({'status': 500});
        } else {
          let ids = [];
          _.forEach(data.models, (value) => {
            console.log(value);
            ids.push(value.attributes.auction_id);
          });
          console.log(ids);
          new AuctionModel()
              .query(function(qb) {
                qb.whereIn('id', ids)
              })
              .fetchAll()
              .then((data) => {
                if (data === null || data === undefined ||
                    data.models.length < 1) {
                  res.json({'status': 500});
                } else {
                  data.models.forEach(function(model) {
                    respData.push(model.attributes);
                  });
                  console.log(respData);
                  res.json({
                    'status': 200,
                    'data': JSON.parse(JSON.stringify(respData))
                  });
                }
              });
        }
      });
});


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
      s4() + s4();
}

var storage = multer.diskStorage({
  destination: function(req,file,callback) {
    callback(null,'../iSell/public/images');
  },
  filename: function(req,file,callback){
    callback(null,guid()+'.jpg');
  }
});


router.post(
    '/upload', multer({storage: storage}).single('file'),
    function(req, res, next) {

      console.log(req.body);
      let auction_id = Number.parseInt(req.body.auction_id);

      new PictureModel()
          .save({picture_url: req.file.filename, auction_id: auction_id})
          .then((data) => {
            if (data === null || data === undefined) {
              res.json({'status': '500'});
            } else {
              res.json({
                'status': '200'
              });
            }
          });
    });

router.post('/sendEmail', handleSayHello);
function handleSayHello(req, res) {
  let winner_email = req.body.winner;
  let seller_email = req.body.seller;
  let auction_name = req.body.auction_name;
  var text =
      'Hello, \n\n You have won the Auction for the item on iSell. The seller will contact you shortly. \n\n Have a good day,\n Team iSell';

  var text2 =
      'Hello, \n\n The winner of your auction is '+ winner_email +'. \n\n. Contact them for more information. Have a good day,\n Team iSell';
  const user_name = 'zerju12@gmail.com';
  const refresh_token = '1/I-PkzN2efS7JLxD24vd3ulUy8F22xqTlkNYP8Wp3LyU';
  const access_token =
      'ya29.GlteBFB2R97ZsBxWn6iDF6mIYaIIBUSXtk-enAV4No4VvTUCHE-crGbRPYBkP9UG5qkHs04eX_1ieLHxWrIi6PnJI0QHLUBFBzCQSUq_aTi1Fi52sr17GWDpLpGn';
  const client_id =
      '80220105165-41r5if1otpa098tikem3c0l9gmblvg3s.apps.googleusercontent.com';
  const client_secret = '_h1LA7EM3-cpf3QqxVHYh5VC';

  const email_to = winner_email;
  const email_to_seller = seller_email;

  const nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {type: 'OAuth2', clientId: client_id, clientSecret: client_secret}
  });
  transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
  });
  // setup e-mail data with unicode symbols
  let mailOptions = {
    from: user_name,               // sender address
    to: email_to,                  // list of receivers
    subject: 'Congratz for wining the Auction',            // Subject line
    text: text,                    // plaintext body
    html: text,  // html body

    auth: {
      user: user_name,
      refreshToken: refresh_token,
      accessToken: access_token,
      expires: new Date().getTime() + 2000
    }
  };

  let mailOptions2 = {
    from: user_name,                             // sender address
    to: email_to_seller,                         // list of receivers
    subject: 'The winner information',  // Subject line
    text: text2,                                  // plaintext body
    html: text2,                                  // html body

    auth: {
      user: user_name,
      refreshToken: refresh_token,
      accessToken: access_token,
      expires: new Date().getTime() + 2000
    }
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  transporter.sendMail(mailOptions2, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}
module.exports = router;
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


let bids = [];

let AuctionModel = bookshelf.Model.extend({tableName: 'auction'});

let BidModel = bookshelf.Model.extend({tableName: 'auction_bids'});

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
        lat: lat, long: long
      })
      .then((data) => {
        if (data === null || data === undefined) {
          res.json({status: '500'});
        } else {
          res.json({status: '200'});
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
            lat: lat, long: long
          },
          {patch: true})
      .then((data) => { res.json({status: '200'}); });


});

// kličema za edit in prikaz
router.get('/details', (req, res, next) => {
  let id = req.query.id;

  new AuctionModel()
      .query({where: {'id': id}})
      .fetch()
      .then((data) => {
        if (data === null || data === undefined) {
          res.json({status: '500'});
        } else {
          res.json({status: '200', data: data.toJSON()});
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
        qb.whereBetween('lat', [Number(lat) - 1, Number(lat) + 1])
            .whereBetween('long', [Number(long)-1, Number(long)+1]);
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
      .query(function(qb) { qb.where('category', '=', cat); })
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
  new AuctionModel({id: idDelete})
      .destroy()
      .then((data) => { res.json({status: '200'}); });
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

  new AuctionModel()
      .where('user_id', '=', user_id)
      .fetchAll()
      .then((data) => {
        if (data === null || data === undefined || data.models.length < 1) {
          res.json({'status': 200});
        } else {
          data.models.forEach(function(model) {
            respData.push(model.attributes);
          });
          res.json(
              {'status': 200, 'data': JSON.parse(JSON.stringify(respData))});
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
              .query(function(qb) { qb.whereIn('id', ids) })
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

router.post('/upload', function(req, res, next) {

  var tempPath = req.files.file.path,
      targetPath = path.resolve('./img/image.png');

  fs.rename(tempPath, targetPath, function(err) {
    if (err) throw err;
    console.log("Upload completed!");
  });


  /* var fstream;
   req.pipe(req.busboy);
   req.busboy.on('file', function(fieldname, file, filename) {
     console.log("Uploading: " + filename);

     // Path where image will be uploaded
     fstream = fs.createWriteStream(__dirname + '/img/' + filename);
     file.pipe(fstream);
     fstream.on('close', function() {
       console.log("Upload Finished of " + filename);
       // res.redirect('back');  // where to go next
     });
   });*/
});
module.exports = router;
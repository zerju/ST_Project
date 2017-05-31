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


let bids = [];

let AuctionModel = bookshelf.Model.extend({
   tableName: 'auction'
});

let BidModel = bookshelf.Model.extend({
    tableName: 'auction_bids'
});

router.post('/create',(req,res,next)=> {
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

    new AuctionModel().save({date_from: date_from,date_to: date_to, auction_name: name, auction_item: item,
        user_id: user_id, item_description: description, price: price, category: category, lat: lat, long: long}).then((data)=>{
        if(data === null || data === undefined){
            res.json({
                status: '500'
            });
        }else {
            res.json({
               status: '200' 
            });
        }
    });
    
});

//kličema za edit in prikaz
router.get('/details',(req,res,next)=> {
    let id = req.query.id;

    new AuctionModel().query({where: {'id': id}})
    .fetch()
    .then((data)=>{
        if(data === null || data === undefined){
            res.json({
               status: '500' 
            });
        }else{
            res.json({
            status: '200',
            data: data.toJSON()
            });
        }
    });
});

router.get('/search',(req,res,next)=> {
    let searchTerm = '%'+req.query.search+'%';
    let respData = [];
    console.log(searchTerm);

    new AuctionModel().query(function(qb) {
        qb.where('auction_item', 'LIKE', searchTerm).orWhere('category', 'LIKE', searchTerm).orWhere('auction_name', 'LIKE', searchTerm);
    })
    .fetchAll()
    .then((data)=>{
        if(data === null ||data === undefined || data.models.length < 1){
             res.json({status: '500'});
        }
        else{
            data.models.forEach(function (model) {
                respData.push(model.attributes);
            }); 
            res.json({
                status: '200',
                data: JSON.parse(JSON.stringify(respData))});   
        }
    });
});

router.get('/byLocation',(req,res,next)=> {
    let lat = req.query.lat;
    let long = req.query.long;
    let respData = [];

    new AuctionModel().query(function(qb) {
        qb.where('lat', '=', lat).where('long', '=', long);
    })
    .fetchAll()
    .then((data)=>{
        if(data === null ||data === undefined || data.models.length < 1){
             res.json({status: '500'});
        }
        else{
            data.models.forEach(function (model) {
                respData.push(model.attributes);
            }); 
            res.json({
                status: '200',
                data: JSON.parse(JSON.stringify(respData))});   
        }
    });
});

router.get('/byCategory',(req,res,next)=> {
    let cat = req.query.category;
    let respData = [];

    new AuctionModel().query(function(qb) {
        qb.where('category', '=', cat);
    })
    .fetchAll()
    .then((data)=>{
        if(data === null ||data === undefined || data.models.length < 1){
             res.json({status: '500'});
        }
        else{
            data.models.forEach(function (model) {
                respData.push(model.attributes);
            }); 
            res.json({
                status: '200',
                data: JSON.parse(JSON.stringify(respData))});   
        }
    });
});

router.delete('/delete',(req,res,next)=>{
    let idDelete = req.query.delete;
    new AuctionModel({id: idDelete})
    .destroy()
    .then((data)=>{
        res.json({
           status: '200' 
        });
    });
});

router.post('/placeBid',(req,res,next)=> {
    //let newBid = new Bid(bids.length+1,req.body.user_id,req.body.auction_id,req.body.value);

   // bids.push(newBid);

   let userId = req.body.userId;
   let auctionId = req.body.auctionId;

   new BidModel().save({user_id: userId, auction_id: auctionId}).then((data)=>{
        if(data === null || data === undefined){
            res.json({
                status: '500'
            });
        }else {
            res.json({
               status: '200' 
            });
        }
    });
});

module.exports = router;
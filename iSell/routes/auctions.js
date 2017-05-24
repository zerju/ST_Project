/**
 * Created by Jure on 12. 03. 2017.
 */
let Auction = require('../models/auction');

let Bid = require('../models/bid');
let express = require('express');
let router = express.Router();


let auctions = [];
let bids = [];


router.post('/create',(req,res,next)=> {
    let newAuction =new Auction(auctions.length+1,req.body.date_from,req.body.date_to,req.body.auction_name,
        req.body.auction_item,req.body.auction_user_id,req.body.item_description,req.body.price,req.body.category,
    req.body.pictures);

    auctions.push(newAuction);

    res.json({
        status: '200',
        auction: newAuction,
    });
});

router.post('/placeBid',(req,res,next)=> {
    let newBid = new Bid(bids.length+1,req.body.user_id,req.body.auction_id,req.body.value);

    bids.push(newBid);

    res.json({
        status: '200',
        bid: newBid,
    })
});

module.exports = router;
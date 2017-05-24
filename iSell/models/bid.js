/**
 * Created by Jure on 12. 03. 2017.
 */

class Bid{
    constructor(bid_id,user_id,auction_id,value){
        this.bid_id = bid_id;
        this.user_id = user_id;
        this.auction_id = auction_id;
        this.value = value;
    }
}

module.exports = Bid;

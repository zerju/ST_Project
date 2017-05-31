/**
 * Created by Jure on 12. 03. 2017.
 */


class Auction{
    constructor(auction_id, date_from, date_to, auction_name, auction_item, auction_user_id, item_description, price, category, pictures, lat, long){
        this.auction_id = auction_id;
        this.date_from = date_from;
        this.date_to = date_to;
        this.auction_name = auction_name;
        this.auction_item = auction_item;
        this.auction_user_id = auction_user_id;
        this.item_description = item_description;
        this.price = price;
        this.category = category;
        this.pictures = pictures;
        this.lat = lat;
        this.long = long;
    }
}

module.exports = Auction;
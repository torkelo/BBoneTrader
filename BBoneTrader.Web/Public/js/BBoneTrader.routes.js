
BBoneTrader.Router = function (Backbone) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "auctions": "auctions",
            "new": "new",
            "log": "log",
            "*path": "auctions"
        },

        auctions: function () {
            BBoneTrader.AuctionList.show();
        },

        new: function () {            
            BBoneTrader.NewAuction.show();
        },

        log: function () {
            BBoneTrader.Log.show();
        }
    });


    return new AppRouter();
    
} (Backbone);

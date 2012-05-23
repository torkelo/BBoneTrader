// 

var AppRouter = Backbone.Router.extend({

	routes: {
            "auctions": "auctions",
            "new": "new",
            "log": "log",
            "*path": "auctions"
    },

    auctions: function () {
      	$("#main-region").html("<h2>Auction list</h2>");
    },

    new: function () {            
      	$("#main-region").html("<h2>new Auction</h2>");
    },

    log: function () {
        $("#main-region").html("<h2>Log page</h2>");
    }

});

var router = new AppRouter();

Backbone.history.start();
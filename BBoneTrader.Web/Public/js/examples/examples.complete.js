
//
// Models 
// 
var Auction = Backbone.Model.extend({
	url: "api/auctions"

	defaults: {
		title: "generic title",
		description: "generic description"
	},

	initialize: function() {
		// init code
	},

	placeBid: function() {
		// do something interesting		
	}

});

var item = new Auction({ title: "some title", description: "some description" });

title.set({title: "new title"});

var title = item.get("title");

item.on("change", function({
	// something changed!
}));

item.on("change:title", function({
	// title changed
}));

item.placeBid();


//
// Main view
// 

<form class="well form-search">
  <input type="text" class="input-medium search-query">
  <button type="submit" class="btn">Search</button>
</form>

var MainView = Backbone.View.extend({
	el: $("#app-view"),
	events: {		
		"click .btn": "clicked",
		"change .input-medium": "textChanged"  
	},

	initialize: function(options){

	},

	clicked: function() {
		alert("clicked!");
	},

	textChanged: function() {
		alert("textChanged!");
	}
});

var view = new MainView();


//
// Collection fetch & render
//

var Auction = Backbone.Model.extend({});

var AuctionCollection = Backbone.Collection.extend({	
	model: Auction,
	url: "api/auctions/list",
})

var AuctionListView = Backbone.View.extend({

	initialize: function () {

		this.collection = new AuctionCollection();		
		this.collection.on("reset", this.render, this);

		this.collection.fetch();
	}, 

	render: function() {
		this.collection.forEach(function(item) {

			$("#main-region").append("<div class='row well'>" + item.get("Title") + "</div>");

		});
	}

});


var listView = new AuctionListView();

// 
// Item view
//

var AuctionItemView = Backbone.View.extend({

	events: {
		"click .place-bid": "placeBid"
	},
	
	render: function() {
		var template = $("#auction-item-template").text();
		
		var html = Mustache.to_html(template, this.model.toJSON());
        $(this.el).html(html);

        return this;
	},

	placeBid: function() {
		this.model.set({Bids: 1});
	}

});


//
//  View base
//

var AppViewBase = Backbone.View.extend({

	render: function() {
		var template = $(this.template).text();
		
		var html = Mustache.to_html(template, this.model.toJSON());
        $(this.el).html(html);

        return this;
	}

});

// Model save
placeBid: function() {
    var command = new PlaceBidCommand({
        auctionId: this.model.get("Id"),
        amount: $(".bid-amount", this.el).val()
    });            

    command.save({}, {
        error: function() { utils.showAlert("Error", "Failed to place bid", "alert-error"); },
        success: function() { utils.showAlert("Success", "Bid placed!", "alert-success"); }
    });
},


//
// Router
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

Backbone.history.start({pushState: true});

router.navigate("new");
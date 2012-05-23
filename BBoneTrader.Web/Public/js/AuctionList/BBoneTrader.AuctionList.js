
BBoneTrader.AuctionList = function (Backbone, $) {      

    var PlaceBidCommand = Backbone.Model.extend({
        url: "api/auctions/placeBid"
    });

    var AuctionListItem = Backbone.Model.extend({
        idAttribute: "Id"
    });

    var AuctionListCollection = Backbone.Collection.extend({
        model: AuctionListItem,
        url: "/api/auctions/list"
    });

    var AuctionListItemView = BBoneTrader.View.extend({
        tagName: "div",
        className: "row",
        template: "#auction-item-template",
        events: {
            "click .place-bid": "placeBid"
        },

        initialize: function() {
            this.model.on("change", this.render, this);                        
        },

        render: function() {           

            BBoneTrader.View.prototype.render.call(this);
            
            if (this.model.get("NewBid")) {
                utils.highlight(this.el);                
            }

            return this;
        },

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

        onClose: function() {
            this.model.off("change", this.render);
        }

    });


    var AuctionListView = Backbone.View.extend({
        tagName: "div",
        id: "auction-list",
        
        initialize: function () {

            this.collection.on("add", this.auctionAdded, this);

            this.childViews = [];
        },

        render: function () {           

            $(this.el).html("<h3>Auction List</h3>");

            this.collection.forEach(this.renderItemView, this);

            return this;
        },

        renderItemView: function(item) {
            var itemView = new AuctionListItemView({ model: item });
            $(this.el).append(itemView.render().el);

            this.childViews.push(itemView);

            return itemView;
        },

        auctionAdded: function(item) {            
            var itemElement = this.renderItemView(item).el;            
            utils.highlight(itemElement);
        },

        onClose: function() {            
            this.collection.off("add", this.auctionAdded);

            _(this.childViews).forEach(function(itemView) {
                itemView.close();
            });
        }
        
    });

    // start loading auctions directly
    var auctionList = new AuctionListCollection();
    var auctionListPromise = auctionList.fetch();

    // Events
    BBoneTrader.Events.on("serverEvent:bidPlaced", function(data) {
        var auction = auctionList.get(data.Id);
        auction.set(data);
    });

    BBoneTrader.Events.on("serverEvent:newAuction", function(data) {
        var listItem = new AuctionListItem(data);
        auctionList.add(listItem);
    });

    // Public api    
    var AuctionList = {};    
    
    AuctionList.show = function () {
        auctionListPromise.done(function() {            
            var auctionListView = new AuctionListView({collection: auctionList});        
            BBoneTrader.AppView.showView(auctionListView);
        });        
    };

    return AuctionList;

} (Backbone, jQuery, BBoneTrader.Events);



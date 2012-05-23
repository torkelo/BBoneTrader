
BBoneTrader.NewAuction = function (Backbone, $) {
	
    var NewAuctionView = BBoneTrader.View.extend({
        template: "#new-auction-template",
        events: {
            "click .create": "create",
            "change": "change"
        },

        change: function(event){
            utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.id] = target.value;
            this.model.set(change);

            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.id);

            if (check.isValid === false) {
                utils.addValidationError(target.id, check.message);
            } else {
                utils.removeValidationError(target.id);
            }
        },

        create: function(e) {
            
            var check = this.model.validateAll();
            if (check.isValid === false) {                
                utils.displayValidationErrors(check.messages);
                return false;
            }

            this.model.save({}, { error: this.saveFailed, success: this.saveSuccess });
        },

        saveFailed: function(model, resp) {
            utils.showAlert("Error", "Failed to create auction", "alert-error");
        },

        saveSuccess: function(model, resp) {            
            utils.showAlert("Success", "New Auction created!", "alert-success");            
            BBoneTrader.Router.navigate("auctions", true);
        }
        
    });


	// public api
    var newAuction = {};

    newAuction.show = function() {
    	var view = new NewAuctionView({model: new BBoneTrader.Commands.NewAuctionCommand()});
        BBoneTrader.AppView.showView(view);
    };

    return newAuction;

}(Backbone, jQuery);

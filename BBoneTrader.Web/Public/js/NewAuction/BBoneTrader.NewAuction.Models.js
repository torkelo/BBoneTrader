
BBoneTrader.Commands.NewAuctionCommand = Backbone.Model.extend({
    url: "api/auctions/create",
    
    defaults: {
        title: "",
        description: "",
        minBid: 0
    },

    initialize: function () {
        this.validators = {};

        this.validators.title = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a title"};
        };
        
        this.validators.minBid = function (value) {
            return $.isNumeric(value) ? {isValid: true} : {isValid: false, message: "You must enter a number"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    }

});
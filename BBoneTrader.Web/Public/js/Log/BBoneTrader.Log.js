
BBoneTrader.Log = function (Backbone, $) {

    var LogItem = Backbone.Model.extend({});
    var LogItemCollection = Backbone.Collection.extend({
        model: LogItem
    });

    var LogItemView = BBoneTrader.View.extend({
        template: "#log-item-template",
        tagName: "tr"
    });
	
    var LogView = BBoneTrader.View.extend({
        template: "#log-template",

        initialize: function() {
            this.collection.on("add", this.logItemAdded, this);
        },

        logItemAdded: function(logItem) {               
            var view = new LogItemView({model: logItem});            
            $("tbody", this.el).prepend(view.render().el);
        }

    });

    var logItems = new LogItemCollection();

    // Events
    BBoneTrader.Events.on("serverEvent:logMessage", function(data) {
        logItems.add(new LogItem(data));
    });

	// public api
    var log = {};

    log.show = function() {
    	var view = new LogView({collection: logItems});
        
        BBoneTrader.AppView.showView(view);
        BBoneTrader.Hub.joinGroup("log");
    };

    return log;

}(Backbone, jQuery);

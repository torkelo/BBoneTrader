BBoneTrader.Hub = function(Backbone, $) {

	var traderHub = $.connection.traderHub;

	traderHub.bidPlaced = function(data) {
		BBoneTrader.Events.trigger("serverEvent:bidPlaced", data);
	};

	traderHub.newAuction = function(data) {
		BBoneTrader.Events.trigger("serverEvent:newAuction", data);
	};

	traderHub.newLogMessage = function(data) {
		BBoneTrader.Events.trigger("serverEvent:logMessage", data);
	};

	var hubStart = $.connection.hub.start();

	// public api
	var hub = {};
	hub.joinGroup = function(name) {
		hubStart.done(function() {
			traderHub.joinGroup(name);	
		});		
	};

	hub.leaveGroup = function(name) {
		hubStart.done(function() {
			traderHub.leaveGroup(name);
		});		
	};



	return hub;

}(Backbone, jQuery);
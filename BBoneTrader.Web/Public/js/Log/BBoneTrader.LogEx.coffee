
class LogItem extends Backbone.Model

class LogItemCollection extends Backbone.Collection
	model: LogItem

class LogItemView extends BBoneTrader.View
	template: '#log-item-template'
	tagName: 'tr'

class LogView extends BBoneTrader.View
	template: "#log-template"

	initialize: ->
		@collection.on "add", @logItemAdded

	logItemAdded: (logItem) -> 		
		view = new LogItemView(model: logItem)
		$("tbody", @el).prepend(view.render().el)

class Log

	constructor: (@events) ->
		@logItems = new LogItemCollection
		
		@events.on "serverEvent:logMessage", (data) =>	
			@logItems.add(new LogItem(data))

	show: =>
		view = new LogView(collection: @logItems)
		BBoneTrader.AppView.showView view
		BBoneTrader.Hub.joinGroup 'log'

window.BBoneTrader.Log = new Log BBoneTrader.Events



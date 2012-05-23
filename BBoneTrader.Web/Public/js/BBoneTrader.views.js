

BBoneTrader.View = Backbone.View.extend({

        render: function () {
            var template = $(this.template).text();

            var jsonModel = {};
            if (this.model) {
            	jsonModel = this.model.toJSON();
            }

            var html = Mustache.to_html(template, jsonModel);
            $(this.el).html(html);

            return this;
        }

});

Backbone.View.prototype.close = function() {

	this.remove();
	this.unbind();

	if (this.onClose) {
		this.onClose();
	}
};

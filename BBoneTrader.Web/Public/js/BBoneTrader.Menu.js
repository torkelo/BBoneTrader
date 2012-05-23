
BBoneTrader.Menu = function (Backbone, $) {


    var menu = {};
    
    var MenuView = Backbone.View.extend({
        el: $(".nav"),
        events: {
            "click a": "navigate"
        },

        initialize: function() {
             BBoneTrader.Router.on("all", this.routeMatched, this);                
        },

        routeMatched: function(route) {
            $("li.active", this.el).removeClass("active");

            route = route.replace('route:', '');

            $("a[data-route='" + route + "']").parent().addClass("active");
        },

        navigate: function(e) {
            e.preventDefault();
            var route = $(e.target).data("route");
            BBoneTrader.Router.navigate(route, true);            
        }
        
    });
    
    menu.view = new MenuView();

    return menu;

} (Backbone, jQuery);




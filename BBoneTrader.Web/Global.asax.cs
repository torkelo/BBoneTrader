using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;


namespace BBoneTrader.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class Global : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
                name: "CatchAll",
                url: "{*all}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            
            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);            
        }

        protected void Application_Start()
        {
            log4net.Config.XmlConfigurator.Configure();

            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            var templateBundle = new DynamicFolderBundle("html", "*.html", true);
            var context = new BundleContext(new HttpContextWrapper(Context), new BundleCollection(), "~/Public/templates");
            templateBundle.EnumerateFiles(context);
            BundleTable.Bundles.Add(templateBundle);

            var scriptBundle = new DynamicFolderBundle("scripts", "*.js", true);
            var scriptContext = new BundleContext(new HttpContextWrapper(Context), new BundleCollection(), "~/Public/scripts");
            templateBundle.EnumerateFiles(context);
            BundleTable.Bundles.Add(templateBundle);

            BundleTable.Bundles.RegisterTemplateBundles();

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.MediaTypeMappings.Add(new QueryStringMapping("json", "1", new MediaTypeHeaderValue("application/json")));
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.MediaTypeMappings.Add(new QueryStringMapping("xml", "1", new MediaTypeHeaderValue("application/xml")));

        }
    }
}
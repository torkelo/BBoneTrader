using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace BBoneTrader.Web.Helpers
{
    public static class HtmlHelperExtension
    {
        public static IHtmlString RenderTemplates(this HtmlHelper htmlHelper, string src)
        {
            var context = htmlHelper.ViewContext.HttpContext;
            if (string.IsNullOrEmpty(src) || context == null || context.Request.Url == null)
            {
                return null;
            }

            var templateUrl = BundleTable.Bundles.ResolveBundleUrl(src);
            var absoluteUrl = new Uri(context.Request.Url, templateUrl);
            var request = WebRequest.Create(absoluteUrl);
            var response = request.GetResponse();
            var stream = response.GetResponseStream();
            if (stream == null)
            {
                return null;
            }

            var data = new StringBuilder();
            using (var sr = new StreamReader(stream))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    data.AppendLine(line);
                }
            }

            return htmlHelper.Raw(data);
        }
    }
}
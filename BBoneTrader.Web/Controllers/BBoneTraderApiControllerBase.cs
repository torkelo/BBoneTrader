using System.Diagnostics;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using log4net;

namespace BBoneTrader.Web.Controllers
{
    public class LogActionsAttribute : ActionFilterAttribute
    {
        private static ILog _log = LogManager.GetLogger(typeof(LogActionsAttribute));

        private Stopwatch stopwatch;
     
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            stopwatch = new Stopwatch();
            stopwatch.Start(); 
            base.OnActionExecuting(actionContext);
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            stopwatch.Stop();
            _log.InfoFormat("Executed action: {0} in {1}ms", actionExecutedContext.ActionContext.ActionDescriptor.ActionName, stopwatch.ElapsedMilliseconds);

            base.OnActionExecuted(actionExecutedContext);
        }
    }
}
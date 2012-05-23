using System;
using System.Collections.Generic;
using BBoneTrader.Web.Hubs;
using log4net.Appender;
using log4net.Core;

namespace BBoneTrader.Web.Logging
{
    public class SendToBrowserAppender : AppenderSkeleton
    {
        protected override void Append(LoggingEvent loggingEvent)
        {
            TraderHubUtil.BroadcastLogMessage(new LogMessage()
            {
                LoggerName = loggingEvent.LoggerName,
                TimeStamp = loggingEvent.TimeStamp,
                Level = loggingEvent.Level.ToString(),
                Message = loggingEvent.RenderedMessage,
                ExceptionString = loggingEvent.GetExceptionString()
            });
        }
    }


    public class LogMessage
    {
        /// <summary>
        /// An exception message to associate to this message.
        /// </summary>
        public string ExceptionString;

        /// <summary>
        /// Log Level.
        /// </summary>
        public string Level;

        /// <summary>
        /// Logger Name.
        /// </summary>
        public string LoggerName;

        /// <summary>
        /// Log Message.
        /// </summary>
        public string Message;
        
        /// <summary>
        /// Thread Name.
        /// </summary>
        public string ThreadName;

        /// <summary>
        /// Time Stamp.
        /// </summary>
        public DateTime TimeStamp;

    }
}
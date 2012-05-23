using System;
using BBoneTrader.Web.Logging;

namespace BBoneTrader.Web.Models
{
    public class LogMessageViewModel
    {
        public string TimeStamp { get; set; }
        public string LoggerName { get; set; }
        public string Level { get; set; }
        public string LevelCssClass { get; set; }
        public string MessageFull { get; set; }
        public string MessageShort { get; set; }
        public string Exception { get; set; }


        public LogMessageViewModel(LogMessage logMessage)
        {
            TimeStamp = logMessage.TimeStamp.ToString("HH:mm:ss.fff");
            LoggerName = logMessage.LoggerName;
            if (LoggerName.Length > 60)
            {
                LoggerName = LoggerName.Substring(60, LoggerName.Length - 60);
            }
            Level = logMessage.Level;
            LevelCssClass = GetLevelCssClass(logMessage.Level);
            MessageShort = logMessage.Message.Substring(0, Math.Min(logMessage.Message.Length, 130));
            MessageFull = logMessage.Message;
            Exception = logMessage.ExceptionString;
        }

        private string GetLevelCssClass(string level)
        {
            if (level == "DEBUG")
                return "label";
            if (level == "INFO")
                return "label label-info";
            if (level == "WARN")
                return "label label-warning";
            if (level == "ERROR")
                return "label label-important";
            if (level == "FATAL")
                return "label label-inverse";

            return "label";
        }
    }
}
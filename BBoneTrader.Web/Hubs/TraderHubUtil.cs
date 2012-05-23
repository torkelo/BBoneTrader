using BBoneTrader.Web.Logging;
using BBoneTrader.Web.Models;
using SignalR;
using SignalR.Hubs;

namespace BBoneTrader.Web.Hubs
{
    public static class TraderHubUtil
    {
         public static void BroadcastBidPlacedFor(Auction auction)
         {
             var hub = GetHubContext();
             hub.Clients.bidPlaced(new { auction.Id, auction.HighestBid, auction.Bids, NewBid = true });
         }

        public static void BroadcastNewAuction(Auction auction)
        {
            var hub = GetHubContext();
            hub.Clients.newAuction(auction);
        }

        public static void BroadcastLogMessage(LogMessage logMessage)
        {
            var hub = GetHubContext();
            hub.Clients["log"].newLogMessage(new LogMessageViewModel(logMessage));
        }

        public static IHubContext GetHubContext()
        {
            var clientManager = GlobalHost.DependencyResolver.Resolve<IConnectionManager>();
            return clientManager.GetHubContext<TraderHub>();
        }
    }
}
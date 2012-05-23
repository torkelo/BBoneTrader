using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BBoneTrader.Web.Hubs;
using BBoneTrader.Web.Models;

namespace BBoneTrader.Web.Controllers
{
    [LogActions]
    public class AuctionsController : ApiController
    {
        public IEnumerable<Auction> List()
        {
            return _auctions;
        }

        public object Create(NewAuctionCommand command)
        {
            var newAuction = new Auction()
                                 {
                                     Id = _auctions.Count + 1,
                                     Title = command.Title,
                                     Description = command.Description,
                                     MinBid = command.MinBid
                                 };

            _auctions.Add(newAuction);

            TraderHubUtil.BroadcastNewAuction(newAuction);

            return new object();
        }

        public object PlaceBid(PlaceBidCommand bidCommand)
        {
            var auction = _auctions.SingleOrDefault(x => x.Id == bidCommand.AuctionId);
            if (auction == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            
            if (bidCommand.Amount <= auction.HighestBid || bidCommand.Amount < auction.MinBid)
            {
                throw new HttpResponseException("Bid amount to low", HttpStatusCode.ExpectationFailed);
            }


            auction.Bids += 1;
            auction.HighestBid = bidCommand.Amount;

            TraderHubUtil.BroadcastBidPlacedFor(auction);
        
            return new object();
        }



        public static IList<Auction> _auctions = new List<Auction>()
                                                     {
                                                         new Auction()
                                                             {
                                                                 Id = 1,
                                                                 Title = "Game of thrones ultra delux signed edition",
                                                                 Description = "Signed by George R.R. Martin",
                                                                 MinBid = 10
                                                             },
                                                         new Auction()
                                                             {
                                                                 Id = 2,
                                                                 Title = "Old laptop that crashes all the time",
                                                                 Description = "But it can boot",
                                                                 Bids = 112,
                                                                 HighestBid = 700,
                                                             },
                                                         new Auction()
                                                             {
                                                                 Id = 3,
                                                                 Title = "The Mona Lisa",
                                                                 Description = "It is not replica, I promise!",
                                                                 Bids = 0,
                                                                 MinBid = 1500000
                                                             }
                                                     };
    }
}
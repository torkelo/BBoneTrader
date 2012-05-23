using System;
namespace BBoneTrader.Web.Models
{    
    public class Auction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Bids { get; set; }
        public int HighestBid { get; set; }
        public int MinBid { get; set; }

        public bool HasBids { get { return Bids > 0; } set {} }
    }
}
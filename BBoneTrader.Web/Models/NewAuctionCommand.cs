namespace BBoneTrader.Web.Controllers
{
    public class NewAuctionCommand
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int MinBid { get; set; }
    }
}
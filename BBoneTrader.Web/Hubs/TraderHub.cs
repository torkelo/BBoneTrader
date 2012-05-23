using System.Threading.Tasks;
using SignalR.Hubs;

namespace BBoneTrader.Web.Hubs
{
    public class TraderHub : Hub
    {
        public Task JoinGroup(string groupName)
        {
            return Groups.Add(Context.ConnectionId, groupName);
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace MashUpServer.Hubs
{
    [Authorize]
    public class DataHub : Hub
    {

        public DataHub()
        {
            
        }

    }
}
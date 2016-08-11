using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VioWeb.Startup))]
namespace VioWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

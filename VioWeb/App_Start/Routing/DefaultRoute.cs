using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace DinhWeb.App_Start.Routing
{
	public class DefaultRoute : Route
	{
		/// <summary>
		/// 
		/// </summary>
		public DefaultRoute()
			: base("{*path}", new DefaultRouteHandler())
		{
			this.RouteExistingFiles = false;
		}
	}
}
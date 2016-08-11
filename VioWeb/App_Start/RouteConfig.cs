using DinhWeb.App_Start.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VioWeb
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			//default route for under {BlancoRoot}
			routes.Add("Default", new DefaultRoute());

			//routes.MapRoute(
			//	name: "Default",
			//	url: "Script/index.cshtml",
			//	defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
			//);
		}

		public static string GetRoutedUrl(System.Web.HttpContextBase context, string url)
		{
			var urlRouted = "~/Scripts/index.cshtml";
			return urlRouted;
		}
	}
}

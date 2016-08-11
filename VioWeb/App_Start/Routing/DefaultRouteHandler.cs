using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.WebPages;

namespace DinhWeb.App_Start.Routing
{
	// http://stackoverflow.com/questions/21633244/angularjs-with-system-web-routing
	// https://github.com/kriasoft/AngularJS-SPA-Template
	public class DefaultRouteHandler : IRouteHandler
	{
		public IHttpHandler GetHttpHandler(RequestContext requestContext)
		{
			// Use cases:
			//     ~/            -> ~/views/index.cshtml
			//     ~/about       -> ~/views/about.cshtml or ~/views/about/index.cshtml
			//     ~/views/about -> ~/views/about.cshtml
			//     ~/xxx         -> ~/views/404.cshtml
			var filePath = requestContext.HttpContext.Request.AppRelativeCurrentExecutionFilePath;

			if (filePath == "~/")
			{
				filePath = "~/Scripts/index.cshtml";
			}
			else
			{
				if (!filePath.StartsWith("~/views/", StringComparison.OrdinalIgnoreCase))
				{
					filePath = filePath.Insert(2, "views/");
				}

				//if (!filePath.EndsWith(".cshtml", StringComparison.OrdinalIgnoreCase))
				//{
				//	filePath = filePath += ".cshtml";
				//}
			}
			filePath = "~/Scripts/index.cshtml";
			var handler = WebPageHttpHandler.CreateFromVirtualPath(filePath); // returns NULL if .cshtml file wasn't found

			if (handler == null)
			{
				requestContext.RouteData.DataTokens.Add("templateUrl", "/views/404");
				handler = WebPageHttpHandler.CreateFromVirtualPath("~/views/404.cshtml");
			}
			else
			{
				requestContext.RouteData.DataTokens.Add("templateUrl", filePath.Substring(1, filePath.Length - 8));
			}

			return handler;
		}
	}
}
declare module Vio.Scope {
	export interface IVioRootScope extends angular.IScope {
		title: string;
	}
	export interface IVioScope extends angular.IScope {
		$root: IVioRootScope;
	}
}

declare module angular.ui {
	interface IVioState extends IState {
		titleKey: string;
		stickey: boolean;
		discardSticky: boolean;
		deepStateRedirect: boolean;
		caseInsensitiveMatch: boolean;
		fullScreen?: boolean;
	}
	interface IVioProvider extends angular.IServiceProvider {
		state(name: string, config: IVioState): IStateProvider;
		state(config: IVioState): IStateProvider;
	}
}

declare module angular.ui {
	export interface IUrlRouterService {
		listen();
    }
	export interface IUrlRouterProvider {
		deferIntercept();
	}
}

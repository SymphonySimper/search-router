export type Parts = Array<string>;

export type SiteRoute = [hostIndex: number] | [hostIndex: number, pathIndex: number];
export type DirectSearchRoute =
	| [hostIndex: number, pathIndex: number, beforeIndex: number, afterIndex: number]
	| [hostIndex: number, beforeIndex: number, afterIndex: number];
export type Route = SiteRoute | DirectSearchRoute;

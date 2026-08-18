export type RouteResult =
	| { redirect: string; cache: 'short' | 'none' }
	| { status: number; message: string };

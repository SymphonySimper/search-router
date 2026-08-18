export function withProtocol(url: string): string {
	return url.includes('://') ? url : `https://${url}`;
}

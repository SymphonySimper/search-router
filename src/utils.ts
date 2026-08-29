export function withProtocol(...args: Array<string>): string {
	return `https://${args.join('')}`;
}

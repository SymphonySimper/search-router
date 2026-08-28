export function withProtocol(...args: Array<string>): string {
	return `https://${args.join('')}`;
}

export function getKey(value: string): string {
	return value.slice(1); // '/hello' -> 'hello'
}

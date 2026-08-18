type Mappings = Map<string, string>;

const CONFIG: Record<string, Array<string>> = {
	'symphonysimper.com': ['', 'portfolio', 'i', 'my', 'me'],

	// Bank
	'unifiedportal-mem.epfindia.gov.in/memberinterface': ['epfo', 'pf'],
	'passbook.epfindia.gov.in/MemberPassBook/login': ['epfo-passbook', 'pf-passbook'],

	// Bills
	'login.airfiber.co.in/customer_portal': ['airfiber'],
	'pli.indiapost.gov.in': ['indian-post-insurance', 'pli'],

	// Dev
	'github.com/SymphonySimper/.dotfiles': ['dotfiles', 'dots', 'nix-config', 'config'],
	'github.com/SymphonySimper': ['github', 'git', 'gh'],
	'fonts.google.com': ['google-fonts'],
	'leetcode.com': ['leetcode', 'lt'],
	'regex101.com': ['regex101', 'regex'],
	'svelte.dev': ['svelte', 'sv'],
	'svelte-changelog.vercel.app': ['svelte-changelog', 'sv-log'],
	'tailwindcss.com/docs/installation': ['tailwindcss', 'tailwind'],

	// Email
	'mail.google.com/mail/u/0': ['gmail', 'gm'],
	'mail.google.com/mail/u/1': ['gmail-1', 'gm1'],
	'mail.google.com/mail/u/2': ['gmail-2', 'gm2'],

	// Misc
	'chromeenterprise.google/policies': ['chrome-enterprise-policy-list'],

	// Nix
	'nix.dev/manual/nix/latest/language/builtins.html': ['nix-builtins'],
	'nixpkgs-tracker.ocfox.me': ['nix-pr-tracker'],
	'wiki.nixos.org/wiki/NixOS_Wiki': ['nix-wiki'],
	'noogle.dev': ['noogle', 'ng'],

	// Social Media
	'discord.com/channels/@me': ['discord'],
	'www.reddit.com': ['reddit', 'rt'],
	'web.whatsapp.com': ['whatsapp', 'wa'],
	'youtube.com': ['youtube', 'yt'],

	// Utility
	'excalidraw.com': ['excalidraw', 'excali', 'draw'],
	'www.keybr.com': ['keybr'],
	'monkeytype.com': ['monkeytype', 'monkey'],
	'squoosh.app': ['squoosh', 'image-compress'],
	'www.virustotal.com': ['virustotal', 'virus'],
};

function create(): Mappings {
	const mappings: Mappings = new Map();

	for (const [href, keys] of Object.entries(CONFIG)) {
		const value = href.includes('://') ? href : `https://${href}`;

		const allKeys = keys.flatMap((k) => (k.includes('-') ? [k, k.replaceAll('-', ' ')] : k));

		for (const key of allKeys) {
			const pathname = `/${encodeURIComponent(key)}`;

			if (mappings.has(pathname)) {
				throw new Error(`Duplicate pathname found: ${pathname} already mapped to ${mappings.get(pathname)}.`);
			}

			mappings.set(pathname, value);
		}
	}

	return mappings;
}

const mappings = create();

export function getMapping(pathname: string): string | undefined {
	const exact = mappings.get(pathname);

	if (exact) {
		return exact;
	}

	let match: string | undefined;

	for (const [key, href] of mappings) {
		if (!key.startsWith(pathname)) {
			continue;
		}

		if (match !== undefined && match !== href) {
			return undefined;
		}

		match = href;
	}

	return match;
}

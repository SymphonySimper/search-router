export const SEARCH_TERMS_PLACEHOLDER = '{searchTerms}' as const;
export const DEFAULT_SEARCH_KEY = 'default' as const;

type Target = {
	keys: Array<string>;
	path?: `/${string}`;
	search?: `${string}${typeof SEARCH_TERMS_PLACEHOLDER}${string}`;
};

export const CONFIG: Record<string, Array<Target>> = {
	'symphonysimper.com': [
		{ keys: ['portfolio', 'i', 'my', 'me'] },
		{ keys: ['color', 'c'], path: '/color', search: `/${SEARCH_TERMS_PLACEHOLDER}` },
	],

	// Bank
	'unifiedportal-mem.epfindia.gov.in': [{ keys: ['epfo', 'pf'], path: '/memberinterface' }],
	'passbook.epfindia.gov.in': [{ keys: ['epfo-passbook', 'pf-book'], path: '/MemberPassBook/login' }],

	// Bills
	'login.airfiber.co.in': [{ keys: ['airfiber', 'afr'], path: '/customer_portal' }],
	'pli.indiapost.gov.in': [{ keys: ['indian-post-insurance', 'pli'] }],

	// Dev
	'github.com': [
		{ keys: ['github', 'gh'] },
		{ keys: ['repos', 'repo'], path: '/repos' },
		{ keys: ['dotfiles', 'dots', 'nix-config'], path: '/SymphonySimper/.dotfiles' },
	],
	'fonts.google.com': [{ keys: ['google-fonts', 'gf'] }],
	'courses.joshwcomeau.com': [{ keys: ['joshw-courses', 'josh'] }],
	'leetcode.com': [{ keys: ['leetcode', 'lt'] }],
	'regex101.com': [{ keys: ['regex101', 're101'] }],
	'svelte.dev': [{ keys: ['svelte', 'sv'] }],
	'svelte-changelog.dev': [{ keys: ['svelte-changelog', 'sv-log'] }],
	'tailwindcss.com': [{ keys: ['tailwindcss', 'tailwind'], path: '/docs/installation' }],

	// Google
	'www.google.com': [
		{ keys: ['default', 'g'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['flip', 'coin'], path: '/search?q=google%20flip%20a%20coin' },
	],
	'drive.google.com': [{ keys: ['google-drive', 'drive'] }],
	'meet.google.com': [{ keys: ['google-meet', 'meet'] }],
	'mail.google.com': [
		{ keys: ['gmail', 'gm'], path: '/mail/u/0' },
		{ keys: ['gmail-1', 'gm1'], path: '/mail/u/1' },
		{ keys: ['gmail-2', 'gm2'], path: '/mail/u/2' },
	],
	'chromeenterprise.google': [{ keys: ['chrome-enterprise-policy-list'], path: '/policies' }],
	'www.youtube.com': [{ keys: ['youtube', 'yt'], search: `/results?search_query=${SEARCH_TERMS_PLACEHOLDER}` }],

	// Search
	'search.brave.com': [{ keys: ['b'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.amazon.in': [{ keys: ['an'], search: `/s?k=${SEARCH_TERMS_PLACEHOLDER}` }],
	'www.flipkart.com': [{ keys: ['f'], search: `/search?q=${SEARCH_TERMS_PLACEHOLDER}` }],
	'developer.mozilla.org': [{ keys: ['mdn'] }],

	// Nix
	'nix.dev': [{ keys: ['nix-builtins', 'nb'], path: '/manual/nix/latest/language/builtins.html' }],
	'nixpkgs-tracker.ocfox.me': [{ keys: ['nix-pr-tracker', 'npt'] }],
	'wiki.nixos.org': [{ keys: ['nix-wiki', 'nw'], path: '/wiki/NixOS_Wiki' }],
	'noogle.dev': [{ keys: ['noogle', 'ng'], search: `/q?term=${SEARCH_TERMS_PLACEHOLDER}` }],
	'search.nixos.org': [
		{
			keys: ['no'],
			path: '/options',
			search: `?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=${SEARCH_TERMS_PLACEHOLDER}`,
		},
		{
			keys: ['np'],
			path: '/packages',
			search: `?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=${SEARCH_TERMS_PLACEHOLDER}`,
		},
	],

	// Social Media
	'discord.com': [{ keys: ['discord', 'dis'], path: '/channels/@me' }],
	'www.reddit.com': [{ keys: ['reddit', 'rt'] }],
	'web.whatsapp.com': [{ keys: ['whatsapp', 'wp'] }],

	// Utility
	'excalidraw.com': [{ keys: ['excalidraw', 'ed', 'draw'] }],
	'www.keybr.com': [{ keys: ['keybr'] }],
	'monkeytype.com': [{ keys: ['monkeytype', 'mt'] }],
	'squoosh.app': [{ keys: ['squoosh', 'sq', 'image-compress'] }],
	'www.virustotal.com': [{ keys: ['virustotal', 'vt'] }],
	'speed.cloudflare.com': [{ keys: ['speed', 'speedtest', 'ookla'] }],

	//// AI
	'chatgpt.com': [
		{ keys: ['chatgpt', 'gpt', 'ai'], search: `?q=${SEARCH_TERMS_PLACEHOLDER}` },
		{ keys: ['fg'], search: `?q=Fix%20grammar%20%60${SEARCH_TERMS_PLACEHOLDER}%60` },
	],
	'gemini.google.com': [{ keys: ['gemini', 'gi'] }],
};

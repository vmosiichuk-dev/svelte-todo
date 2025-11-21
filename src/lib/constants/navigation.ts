import type { Pathname } from '$app/types';

type Route = { title: string, path: Pathname };

export const APP_TITLE = 'Mindmap';

export const ROUTES: Record<string, Route> = {
	HOMEPAGE: { title: 'Homepage', path: '/' },
	ADVANCED: { title: 'Advanced', path: '/advanced' }
};

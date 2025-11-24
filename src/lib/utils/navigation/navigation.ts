import type { Pathname } from '$app/types';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

type Route = { title: string; path: Pathname };

type GotoOptions = {
	replaceState?: boolean | undefined;
	noScroll?: boolean | undefined;
	keepFocus?: boolean | undefined;
	invalidateAll?: boolean | undefined;
	invalidate?: (string | URL | ((url: URL) => boolean))[] | undefined;
	state?: App.PageState | undefined;
};

export const APP_TITLE = 'Mindmap';

export const ROUTES: Record<string, Route> = {
	HOMEPAGE: { title: 'Homepage', path: '/' },
};

export const getBrowserTabTitle = (pageTitleOrStatus: string | number): string => {
	return `${APP_TITLE} | ${pageTitleOrStatus}`;
};

export const gotoPage = async (
	path: Pathname,
	options?: GotoOptions
): Promise<void> => {
	const resolvedPath = resolve(path);
	await goto(resolvedPath, options);
};

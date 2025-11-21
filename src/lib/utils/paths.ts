import { APP_TITLE } from '$lib/constants/app';

export const getBrowserTabTitle = (pageTitle: string): string => {
	return `${APP_TITLE} | ${pageTitle}`;
};

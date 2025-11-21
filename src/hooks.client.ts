import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({
	error,
	event,
	status,
	message,
}): App.Error => {
	const customMessage = 'Internal Error';
	const errorId = crypto.randomUUID();

	console.error(customMessage, { error, event, status, message });
	return { message: customMessage, errorId };
};

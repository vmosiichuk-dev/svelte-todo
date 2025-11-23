import { LocalStorage } from '$utils';

export type User = {
	id: string;
	name?: string;
	avatar?: string;
};

export class UserState {
	loaded = $state(false);
	#storage = new LocalStorage<User>('user', {
		id: crypto.randomUUID(),
		name: '',
		avatar: '',
	});

	constructor() {
		this.loaded = true;
	}

	get user() {
		return this.#storage.current;
	}

	get name() {
		return this.#storage.current?.name ?? '';
	}

	get avatar() {
		return this.#storage.current?.avatar ?? '';
	}

	update(name?: User['name'], avatar?: User['avatar']) {
		this.#storage.current = { ...this.user, name, avatar };
	}
}

export const user = new UserState();

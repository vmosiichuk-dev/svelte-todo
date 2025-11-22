import { LocalStorage } from '$utils';

export type User = {
	id: string;
	name: string;
	avatar?: string;
};

export class UserState {
	#storage = new LocalStorage<User>('user', {
		id: crypto.randomUUID(),
		name: 'Linus Torvalds',
		avatar: '',
	});

	get all() {
		return this.#storage.current;
	}

	add(user: User) {
		this.#storage.current = [...this.all, user];
	}

	remove(id: string) {
		this.#storage.current = this.all.filter((user: User) => {
			return user.id !== id;
		});
	}

	update(id: string, patch: Partial<User>) {
		this.#storage.current = this.all.map((user: User) => {
			return user.id === id ? { ...user, ...patch } : user;
		});
	}
}

export const user = new UserState();

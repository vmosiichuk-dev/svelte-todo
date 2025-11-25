<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import { tasks } from '$state/tasks';
	import { PlusIcon } from '$assets';
	import { Button, IconButton, Input, Label, Textarea } from '$ui';
	import * as Drawer from '$components/drawer';

	let { children }: { children?: Snippet } = $props();

	let drawerOpen = $state(false);
	let formTitle = $state('');
	let formDescription = $state('');

	const toggleDrawer = () => {
		drawerOpen = !drawerOpen;
	};

	const resetState = () => {
		drawerOpen = false;
		formTitle = '';
		formDescription = '';
	};

	const addTask = () => {
		tasks.add({
			id: crypto.randomUUID(),
			title: formTitle,
			description: formDescription,
			status: 'todo',
			date: SvelteDate.now(),
		});

		resetState();
	};
</script>

<div class="relative">
	<Drawer.Root bind:open={drawerOpen}>
		<div class="absolute top-0 right-1 flex items-center gap-3">
			<IconButton onclick={toggleDrawer}>
				<PlusIcon class="size-6 drop-shadow-liquid" />
			</IconButton>

			{@render children?.()}
		</div>

		<Drawer.Content side="right">
			<Drawer.Header>
				<Drawer.Title>Add a task</Drawer.Title>

				<Drawer.Description>
					Fill in the required fields to add a new task
				</Drawer.Description>
			</Drawer.Header>

			<form class="grid gap-8 p-4">
				<fieldset class="grid gap-2">
					<Label for="form-title" class="gap-0">
						Title<sup class="text-destructive">*</sup>
					</Label>

					<Input
						id="form-title"
						bind:value={formTitle}
						placeholder="Enter title..."
						required
					/>
				</fieldset>

				<fieldset class="grid gap-2">
					<Label for="form-description">Description</Label>

					<Textarea
						id="form-description"
						bind:value={formDescription}
						placeholder="Enter description..."
					/>
				</fieldset>
			</form>

			<Drawer.Footer class="mb-4">
				<Button onclick={addTask} disabled={formTitle === ''}>
					Submit
				</Button>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>

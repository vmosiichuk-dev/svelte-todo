<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { ModeToggle } from '$components/mode-toggle';
	import { Button } from '$components/button';
	import { Menu } from '@lucide/svelte';
	import * as Avatar from '$components/avatar';
	import * as Sheet from '$components/sheet';
	import './layout.css';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="contain-layout">
	<header class="flex justify-between">
		<Sheet.Root>
			<Sheet.Trigger>
				<Button size="icon-sm">
					<Menu />
				</Button>
			</Sheet.Trigger>

			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title>Edit profile</Sheet.Title>

					<Sheet.Description>
						Make changes to your profile here. Click save when
						you're done.
					</Sheet.Description>
				</Sheet.Header>

				<ModeToggle />

				<!-- <Sheet.Footer></Sheet.Footer> -->
			</Sheet.Content>
		</Sheet.Root>

		<Sheet.Root>
			<Sheet.Trigger>
				<Avatar.Root>
					<Avatar.Image
						src="https://github.com/leerob.png"
						alt="@leerob"
					/>

					<Avatar.Fallback>LR</Avatar.Fallback>
				</Avatar.Root>
			</Sheet.Trigger>

			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>Edit profile</Sheet.Title>

					<Sheet.Description>
						Make changes to your profile here. Click save when
						you're done.
					</Sheet.Description>
				</Sheet.Header>

				<ModeToggle />

				<!-- <Sheet.Footer></Sheet.Footer> -->
			</Sheet.Content>
		</Sheet.Root>
	</header>

	{@render children()}
</div>

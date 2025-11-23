<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { ModeToggle } from '$components/mode-toggle';
	import * as Avatar from '$components/avatar';
	import * as Sheet from '$components/sheet';
	import './layout.css';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="grid min-h-dvh w-full items-start gap-4 p-6">
	<Sheet.Root>
		<Sheet.Trigger class="absolute right-6">
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
					Make changes to your profile here. Click save when you're
					done.
				</Sheet.Description>
			</Sheet.Header>

			<ModeToggle />

			<!-- <Sheet.Footer></Sheet.Footer> -->
		</Sheet.Content>
	</Sheet.Root>

	{@render children()}
</div>

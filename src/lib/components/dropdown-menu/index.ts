import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import Content from './dropdown-menu-content.svelte';
import Group from './dropdown-menu-group.svelte';
import Item from './dropdown-menu-item.svelte';
import Label from './dropdown-menu-label.svelte';
import Separator from './dropdown-menu-separator.svelte';
import Shortcut from './dropdown-menu-shortcut.svelte';
import Trigger from './dropdown-menu-trigger.svelte';
import SubContent from './dropdown-menu-sub-content.svelte';
import SubTrigger from './dropdown-menu-sub-trigger.svelte';
import GroupHeading from './dropdown-menu-group-heading.svelte';
const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;

export {
	Content,
	Group,
	GroupHeading,
	Item,
	Label,
	Root,
	Separator,
	Shortcut,
	Sub,
	SubContent,
	SubTrigger,
	Trigger,
};

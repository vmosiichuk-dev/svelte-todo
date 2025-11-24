import { Dialog as DrawerPrimitive } from 'bits-ui';
import Trigger from './drawer-trigger.svelte';
import Close from './drawer-close.svelte';
import Overlay from './drawer-overlay.svelte';
import Content from './drawer-content.svelte';
import Header from './drawer-header.svelte';
import Footer from './drawer-footer.svelte';
import Title from './drawer-title.svelte';
import Description from './drawer-description.svelte';

const Root = DrawerPrimitive.Root;
const Portal = DrawerPrimitive.Portal;

export {
	Root,
	Close,
	Trigger,
	Portal,
	Overlay,
	Content,
	Header,
	Footer,
	Title,
	Description,
};

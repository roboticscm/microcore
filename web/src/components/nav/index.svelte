<script>
	import { Dropdown } from '$lib/dropdown';

	let activeMenuId;
	let dropdownRef;
	const menuList = [
		{ code: 'menu1', icon: '', name: 'sys.menu.menu1', path: '/about' },
		{ code: 'menu2', icon: '', name: 'sys.menu.menu2', path: '/about' },
		{ code: 'separator' },
		{ code: 'menu3', icon: '', name: 'sys.menu.menu3', path: '/about' },
		{ code: 'menu4', icon: '', name: 'sys.menu.menu4', path: '/about' },
		{ code: 'menu5', icon: '', name: 'sys.menu.menu5', path: '/about' }
	];

	const onChooseMenuItem = (menu) => {
		activeMenuId = menu.code;
		Dropdown.hide(dropdownRef);
	};
</script>

<div class="nav">
	<div on:click={() => Dropdown.toggle(dropdownRef)} class="nav__menu">
		<i class="fa fa-bars" />
	</div>
	<div>Title</div>
	<div class="nav__avatar">
		{'username'}
		<img src="/images/logo.png" alt="Avt" />
	</div>
</div>

<div bind:this={dropdownRef} class="dropdown">
	<div class="dropdown__header">
		<div class="dropdown__header__avatar">Avatr</div>
		<div class="dropdown__header__username">username</div>
	</div>
	{#if menuList && Array.isArray(menuList)}
		{#each menuList as menu}
			{#if menu.code === 'separator'}
				<div class="dropdown__separator">
					<hr />
				</div>
			{:else}
				<div
					on:click={() => onChooseMenuItem(menu)}
					class="dropdown__item {activeMenuId === menu.code ? 'dropdown__item__active' : ''}"
				>
					<div>Icon</div>
					<div>{@html menu.name}</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>

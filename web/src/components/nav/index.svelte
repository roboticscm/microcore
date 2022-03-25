<script>
	import { Dropdown } from '$lib/dropdown';
	import { t } from '$lib/i18n';	
	import Locale from '/src/components/locale/index.svelte';

	let activeMenuId;
	let dropdownRef;
	const menuList = [
		{ code: 'separator' },
		{ code: 'dashboard', icon: '<i class="fas fa-chart-bar"></i>', name: 'sys.menu.dashboard', path: '/dashboard' },
		{ code: 'profile', icon: '<i class="fas fa-user-circle"></i>', name:  'sys.menu.profile', path: '/profile' },
		{ code: 'tradingPackage', icon: '<i class="fa-solid fa-box-open"></i>', name:  'sys.menu.trading package', path: '/trading-package' },
		{ code: 'wallet', icon: '<i class="fa-solid fa-bitcoin-sign"></i>', name:  'sys.menu.wallet', path: '/wallet' },
		{ code: 'referrals', icon: '<i class="fas fa-users"></i>', name:  'sys.menu.referrals', path: '/referrals' },
		{ code: 'tradingProof', icon: '<i class="fa-solid fa-bitcoin-sign"></i>', name:  'sys.menu.trading proof', path: '/tradingProof' },
		{ code: 'separator' },
		{ code: 'blogs', icon: '<i class="fas fa-blog"></i>', name:  'sys.menu.blogs', path: '/blogs' },
		{ code: 'about', icon: '<i class="fa-solid fa-user-astronaut"></i>', name:  'sys.menu.about', path: '/about' }
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
		<div style="position: relative; margin-left: 12px; width: 24px; margin-top: -30px; margin-right: -6px;" class="center-box">
			<Locale/>
		</div>
	</div>
	
</div>

<div bind:this={dropdownRef} class="dropdown">
	<div class="dropdown__header">
		<div class="dropdown__header__avatar">
			<img src="/images/logo.png" alt="Avt" />
		</div>
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
					<div>{@html menu.icon}</div>
					<div>{@html $t(menu.name)}</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>

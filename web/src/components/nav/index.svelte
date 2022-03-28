<script>
	import { Dropdown } from '$lib/dropdown';
	import { t } from '$lib/i18n';	
	import Locale from '/src/components/locale/index.svelte';
	import { LoginInfo } from '/src/store/login-info';
	import { AppStore } from '/src/store/app';
	import { someParentHasClass } from '$lib/dom';
	import { onMount } from 'svelte';
	import { genUUID } from '$lib/random';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/authentication';
	import { AuthService } from '../login/service';
	import { getToken } from '$lib/local-storage';
	import { getPublicIp } from '$lib/util'
	import { Browser } from '$lib/browser';

	const { accountAvatar$, displayName$ } = LoginInfo;
	const { currentMenu$ } = AppStore;

	const menuUuidClass = genUUID();

	let activeMenuId;
	let dropdownRef;
	let publicIp;

	const menuList = [
		{ code: 'separator' },
		{ code: 'dashboard', icon: '<i class="fas fa-chart-bar"></i>', name: 'sys.menu.dashboard', path: '/dashboard' },
		{ code: 'profile', icon: '<i class="fas fa-user-circle"></i>', name:  'sys.menu.profile', path: '/profile' },
		{ code: 'tradingPackage', icon: '<i class="fa-solid fa-box-open"></i>', name:  'sys.menu.trading package', path: '/trading-package' },
		{ code: 'wallet', icon: '<i class="fa-solid fa-wallet"></i>', name:  'sys.menu.wallet', path: '/wallet' },
		{ code: 'referrals', icon: '<i class="fas fa-users"></i>', name:  'sys.menu.referrals', path: '/referrals' },
		{ code: 'tradingProof', icon: '<i class="fa-solid fa-clock-rotate-left"></i>', name:  'sys.menu.trading proof', path: '/tradingProof' },
		{ code: 'separator' },
		{ code: 'blogs', icon: '<i class="fas fa-blog"></i>', name:  'sys.menu.blogs', path: '/blogs' },
		{ code: 'about', icon: '<i class="fa-solid fa-user-astronaut"></i>', name:  'sys.menu.about', path: '/about' },
		{ code: 'separator' },
		{ code: 'logout', icon: '<i class="fa fa-sign-out"></i>', name:  'sys.menu.logout', path: '../../' },
	];

	let accountAvatar;
	$: if($accountAvatar$) {
		accountAvatar = $accountAvatar$;
		if(!accountAvatar.startsWith('data:image/')) {
			accountAvatar = 'data:image/png;base64,' + accountAvatar
		}
	}

	$: if(menuList) {
		currentMenu$.next(menuList.find((it) => it.code==='dashboard'));
	}

	const onChooseMenuItem = (menu) => {
		activeMenuId = menu.code;
		currentMenu$.next(menu);
		
		switch (menu.code){
			case 'logout':
				AuthService.logout({
					refreshToken: getToken(true).refreshToken,
					ip: publicIp,
				}).finally(() => {
					logout();
				})
				
				break;
		}

		goto('/views' + menu.path);

		Dropdown.hide(dropdownRef);
	};

	const onDocumentClick = (e) => {
        const ele = e.target;
        if (!someParentHasClass(ele, menuUuidClass)) {
            Dropdown.hide(dropdownRef);
        }
    }

	onMount(async () => {
		publicIp = await getPublicIp();
		document.addEventListener('click', onDocumentClick);
		return () => {
			document.removeEventListener('click', onDocumentClick);
		}
	});
</script>

<div class="nav" >
	<div class="nav__menu {menuUuidClass}" on:click={() => Dropdown.toggle(dropdownRef)}>
		<i class="fa fa-bars" />
	</div>
	<div class="nav__title">{@html $t($currentMenu$.name)}</div>
	
	<div class="nav__avatar">
		<div class="nav__avatar__locale-changer center-box">
			<Locale/>
		</div>

		{#if accountAvatar}
			<img title={LoginInfo.username} class="nav__avatar__img" src="{accountAvatar}" alt="Avt" />
		{:else}
			<div title={LoginInfo.username} class="nav__avatar__text">{($displayName$||'').createAvatar()}</div>
		{/if}
	</div>
	
</div>

<div bind:this={dropdownRef} class="dropdown">
	<div class="dropdown__header">
		<div class="dropdown__header__avatar">
			{#if accountAvatar}
				<img class="dropdown__header__avatar__img" src="{accountAvatar}" alt="Avt" />
			{:else}
				<div class="dropdown__header__avatar__text">{($displayName$||'').createAvatar()}</div>
			{/if}
		</div>
		<div class="dropdown__header__display-name" title={LoginInfo.username}>{$displayName$}</div>
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

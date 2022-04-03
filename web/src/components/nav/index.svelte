<script>
	import { Dropdown } from '$lib/dropdown';
	import { t } from '$lib/i18n';	
	import Locale from '/src/components/locale/index.svelte';
	import { LoginInfo } from '/src/store/login-info';
	import { someParentHasClass } from '$lib/dom';
	import { onMount } from 'svelte';
	import { genUUID } from '$lib/random';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/authentication';
	import { AuthService } from '../login/service';
	import { getToken } from '$lib/local-storage';
	import { getPublicIp } from '$lib/util';

	export let embedMode = false;

	const { accountAvatar$, displayName$, username$, currentMenu$ } = LoginInfo;

	const menuUuidClass = genUUID();

	let activeMenuId;
	let dropdownRef;
	let publicIp;

	const menuList = [
		{ code: 'separator' },
		{ id: '1', code: 'dashboard', icon: '<i class="fas fa-chart-bar"></i>', name: 'sys.menu.dashboard', path: '/dashboard' },
		{ id: '2', code: 'profile', icon: '<i class="fas fa-user-circle"></i>', name:  'sys.menu.profile', path: '/profile' },
		{ id: '3', code: 'tradingPackage', icon: '<i class="fa-solid fa-box-open"></i>', name:  'sys.menu.trading package', path: '/trading-package' },
		{ id: '4', code: 'wallet', icon: '<i class="fa-solid fa-wallet"></i>', name:  'sys.menu.wallet', path: '/wallet' },
		{ id: '5', code: 'referrals', icon: '<i class="fas fa-users"></i>', name:  'sys.menu.referrals', path: '/referrals' },
		{ id: '6', code: 'tradingProof', icon: '<i class="fa-solid fa-clock-rotate-left"></i>', name:  'sys.menu.trading proof', path: '/tradingProof' },
		{ code: 'separator' },
		{ id: '7', code: 'blogs', icon: '<i class="fas fa-blog"></i>', name:  'sys.menu.blogs', path: '/blogs' },
		{ id: '8', code: 'about', icon: '<i class="fa-solid fa-user-astronaut"></i>', name:  'sys.menu.about', path: '/about' },
		{ code: 'separator' },
		{ id: '9', code: 'logout', icon: '<i class="fa fa-sign-out"></i>', name:  'sys.menu.logout', path: '../../' },
	];

	let accountAvatar;
	$: if($accountAvatar$) {
		accountAvatar = $accountAvatar$ || '';
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
					refreshToken: getToken().refreshToken,
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

{#if !embedMode}
	<div class="nav" >
		<div class="nav__logo">
			Logo
		</div>

		<div class="nav__menu {menuUuidClass}" on:click={() => Dropdown.toggle(dropdownRef)}>
			<i class="fa fa-bars" />
		</div>

		<div class="nav__title">{@html $t($currentMenu$.name)}</div>
		
		<div class="nav__avatar">
			<div class="nav__avatar__locale-changer center-box">
				<Locale saveDb = { false } />
			</div>

			{#if accountAvatar}
				<img title={$username$} class="nav__avatar__img" src="{accountAvatar}" alt="Avt" />
			{:else if ($displayName$)}
				<div title={$username$} class="nav__avatar__text">{($displayName$||'').createAvatar()}</div>
			{:else}
				<img title={$username$} class="nav__avatar__img" src="/images/camera.png" alt="Avt" />
			{/if}
		</div>
		
	</div>
{/if}

<div bind:this={dropdownRef} class="{embedMode ? '' : 'dropdown'}">
	<div class="dropdown__header">
		<div class="dropdown__header__avatar">
			{#if accountAvatar}
				<img class="dropdown__header__avatar__img" src="{accountAvatar}" alt="Avt" />
			{:else if $displayName$}
				<div class="dropdown__header__avatar__text">{($displayName$||'').createAvatar()}</div>
			{:else}
				<img title={LoginInfo.username} class="dropdown__header__avatar__img" src="/images/camera.png" alt="Avt" />
			{/if}
		</div>
		<div class="dropdown__header__display-name" title={LoginInfo.username}>{$displayName$ || $t('sys.label.no display name')}</div>
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


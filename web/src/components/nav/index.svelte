<script>
	import { Dropdown } from '$lib/dropdown';
	import { t } from '$lib/i18n';
	import { LoginInfo } from '$src/store/login-info';
	import { someParentHasClass } from '$lib/dom';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthService } from '../login/service';
	import { cleanup, getToken } from '$lib/local-storage';
	import { getPublicIp } from '$lib/util';
	import { menuList } from './helper';
	import { getMenuPathFromUrl } from '$src/lib/url';
	import { AppStore } from '$src/store/app';
	import { App } from '$src/lib/constants';

	export let page = 'views';
	export let isAdmin = false;
	export let menuPath;

	const { accountAvatar$, displayName$, username$, email$, currentMenu$ } = LoginInfo;

	let activeMenuPath;
	let publicIp;
	let filteredMenuList = [];

	$: if (menuList) createFilteredMenuList();

	$: if (menuPath) {
		AppStore.formLoading$.next(true);
		setTimeout(() => {
			AppStore.formLoading$.next(false);
		}, App.FORM_LOAD_TIMEOUT);
	}

	let accountAvatar;
	$: if ($accountAvatar$) {
		accountAvatar = $accountAvatar$ || '';
		if (!accountAvatar.startsWith('data:image/')) {
			accountAvatar = 'data:image/png;base64,' + accountAvatar;
		}
	}

	const createFilteredMenuList = () => {
		filteredMenuList = menuList.filter(
			(it) =>
				(it.page === page && it.code !== 'private') ||
				(it.page === page && isAdmin) ||
				it.page === 'all'
		);
	};

	const onChooseMenuItem = (menu) => {
		if ($currentMenu$?.path === menu.path) {
			return;
		}

		activeMenuPath = menu.path;
		// currentMenu$.next(menu);

		switch (menu.code) {
			case 'logout':
				AuthService.logout({
					refreshToken: getToken().refreshToken,
					ip: publicIp
				}).finally(() => {
					cleanup();
				});

				break;
		}

		goto(menu.path);
		Dropdown.hideFixedClass('main__body__left');
	};

	const onDocumentClick = (e) => {
		const ele = e.target;
		if (!someParentHasClass(ele, 'hamburger-menu')) {
			console.log(someParentHasClass(ele, 'hamburger-menu'));
			Dropdown.hideFixedClass('main__body__left');
		}
	};

	onMount(async () => {
		activeMenuPath = getMenuPathFromUrl();
		publicIp = await getPublicIp();
		document.addEventListener('click', onDocumentClick);
		return () => {
			document.removeEventListener('click', onDocumentClick);
		};
	});
</script>

<div style="overflow: hidden; height: 100%;">
	<div style="overflow: auto; height: 100%;">
		<div class="dropdown__header">
			<div class="dropdown__header__avatar" title={`${$username$} - ${$email$}`}>
				{#if accountAvatar}
					<img class="dropdown__header__avatar__img" src={accountAvatar} alt="Avt" />
				{:else if $displayName$}
					<div class="dropdown__header__avatar__text">{($displayName$ || '').createAvatar()}</div>
				{:else}
					<img class="dropdown__header__avatar__img" src="/images/camera.png" alt="Avt" />
				{/if}
			</div>
			<div
				class="dropdown__header__display-name three-dot-text"
				title={$username$ || $displayName$ || $t('sys.label.no display name')}
			>
				{$displayName$ || $t('sys.label.no display name')}
			</div>
		</div>
		{#if filteredMenuList && Array.isArray(filteredMenuList)}
			{#each filteredMenuList as menu}
				{#if menu.code === 'separator'}
					<div class="dropdown__separator">
						<hr />
					</div>
				{:else}
					<div
						on:click={() => onChooseMenuItem(menu)}
						class="dropdown__item {activeMenuPath === menu.path ? 'dropdown__item__active' : ''}"
					>
						<div>{@html menu.icon}</div>
						<div title={$t(menu.name)} class="three-dot-text">{$t(menu.name)}</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

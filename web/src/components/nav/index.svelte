<script>
	import { Dropdown } from '$lib/dropdown';
	import { t } from '$lib/i18n';
	import Locale from '$components/locale/index.svelte';
	import { LoginInfo } from '$src/store/login-info';
	import { someParentHasClass } from '$lib/dom';
	import { onMount } from 'svelte';
	import { genUUID } from '$lib/random';
	import { goto } from '$app/navigation';
	import { AuthService } from '../login/service';
	import { cleanup, getToken } from '$lib/local-storage';
	import { getPublicIp } from '$lib/util';
	import { menuList } from './helper';
	import { getMenuPathFromUrl } from '$src/lib/url';
	import { AppStore } from '$src/store/app';
	import { App } from '$src/lib/constants';

	export let embedMode = false;
	export let page = 'views';
	export let isAdmin = false;

	const { accountAvatar$, displayName$, username$, email$, currentMenu$ } = LoginInfo;

	const menuUuidClass = genUUID();

	let activeMenuPath;
	let dropdownRef;
	let publicIp;
	let filteredMenuList = [];

	$: if (menuList) createFilteredMenuList();

	$: if ($currentMenu$) {
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
		activeMenuPath = menu.path;
		currentMenu$.next(menu);

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
		Dropdown.hide(dropdownRef);
	};

	const onDocumentClick = (e) => {
		const ele = e.target;
		if (!someParentHasClass(ele, menuUuidClass)) {
			Dropdown.hide(dropdownRef);
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

{#if !embedMode}
	<div class="nav">
		<div class="nav__logo center-box">
			<img
				style="height: 45px; margin-top: 6px;"
				src="/static/images/logo-without-text.png"
				alt="Logo"
			/>
			<img style="height: 45px; margin-top: 6px;" src="/static/images/slogan.png" alt="Slogan" />
		</div>

		<div class="nav__menu {menuUuidClass}" on:click={() => Dropdown.toggle(dropdownRef)}>
			<i class="fa fa-bars" />
		</div>

		<div class="nav__title">{@html $t($currentMenu$.name)}</div>

		<div class="nav__avatar">
			<div class="nav__avatar__locale-changer center-box">
				<Locale saveDb={false} />
			</div>

			<div title={`${$username$} - ${$email$}`}>
				{#if accountAvatar}
					<img class="nav__avatar__img" src={accountAvatar} alt="Avt" />
				{:else if $displayName$}
					<div title={`${$username$} - ${$email$}`} class="nav__avatar__text">
						{($displayName$ || '').createAvatar()}
					</div>
				{:else}
					<img class="nav__avatar__img" src="/images/camera.png" alt="Avt" />
				{/if}
			</div>
		</div>
	</div>
{/if}

<div style="overflow: hidden; height: 100%;">
	<div
		style="overflow: auto; height: 100%;"
		bind:this={dropdownRef}
		class={embedMode ? '' : 'dropdown'}
	>
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

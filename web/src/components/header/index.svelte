<script>
	import { Dropdown } from '$lib/dropdown';
	import { t } from '$lib/i18n';
	import Locale from '$components/locale/index.svelte';
	import { LoginInfo } from '$src/store/login-info';

	const { accountAvatar$, displayName$, username$, email$, currentMenu$ } = LoginInfo;

	let accountAvatar;
	$: if ($accountAvatar$) {
		accountAvatar = $accountAvatar$ || '';
		if (!accountAvatar.startsWith('data:image/')) {
			accountAvatar = 'data:image/png;base64,' + accountAvatar;
		}
	}
</script>

<div class="nav">
	<div class="nav__logo center-box">
		<img
			style="height: 45px; margin-top: 6px;"
			src="/static/images/logo-without-text.png"
			alt="Logo"
		/>
		<img style="height: 45px; margin-top: 6px;" src="/static/images/slogan.png" alt="Slogan" />
	</div>

	<div class="nav__menu hamburger-menu" on:click={() => Dropdown.toggleClass('main__body__left')}>
		<i class="fa fa-bars" />
	</div>

	<div class="nav__title">{@html $t($currentMenu$?.name)}</div>

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

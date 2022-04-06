<script>
	import { t, locale, loadResource } from '$lib/i18n';
	import { SvgIcon } from '$lib/constants';
	import { AppStore } from '$src/store/app';
	import { onMount } from 'svelte';
	import { LoginInfo } from '$src/store/login-info';
	import { SettingService } from '$src/services/setting';

	export let saveDb = false;

	const { notify$ } = AppStore;
	const { locale$ } = LoginInfo;

	const { usFlag, vnFlag } = SvgIcon;

	const onChangeLang = async () => {
		loadResource(fetch);
		if ($locale === 'vi') {
			$locale = 'en';
		} else {
			$locale = 'vi';
		}

		if(saveDb) {
			SettingService.saveUserSetting(['locale'], [$locale]);
		} else {
			localStorage.setItem('locale', $locale);
		}
	};

	onMount(() => {
		loadResource(fetch).then(() => {
			if(saveDb) {
			// TODO load db
			} else {
				const savedLocale = localStorage.getItem('locale');
				if(savedLocale) {
					$locale = savedLocale;
				}
			}
		});
		

		const subscription = notify$.subscribe(async (res) => {
			if(res && res.table === 'resource') {
				const oldValue = locale$.value;
				$locale = "";
				await loadResource(fetch);
				$locale = oldValue;
			}
		});

		return () => {
			subscription && subscription.unsubscribe();
		}
	})
</script>

<div
	title={$locale === 'en'
		? $t('sys.label.change to') + ' ' + $t('sys.label.en')
		: $t('sys.label.change to') + ' ' + $t('sys.label.en')}
	class="country-flag"
	on:click={onChangeLang}
>
	{#if $locale === 'vi'}
		{@html usFlag}
	{:else}
		{@html vnFlag}
	{/if}
</div>

<style>
    .country-flag {
		position: absolute;
		width: 24px;
		height: 24px;
		min-width: 24px;
		min-height: 24px;
		right: 10px;
		top: 10px;
		cursor: pointer;
		z-index: 2;
	}
</style>


<script>
	import { SDate } from '$lib/date';
	import { t, locale } from '$lib/i18n';
	import { config } from '$src/config/config';
	import { LoginInfo } from '$src/store/login-info';
	import { onMount } from 'svelte';
	import ProfileSummary from '$components/profile-summary/index.svelte';
	import Tabs from '$ui/tabs/index.svelte';
	import TextInput from '$components/ui/text-input/index.svelte';
	import Error from '$components/ui/error/index.svelte';
	import Form from '$src/lib/form/form';
	import { App } from '$src/lib/constants';
	import Button from '$components/ui/button/index.svelte';
	import { ButtonType } from '$components/ui/button/types';
	import { SNumber } from '$src/lib/snumber';

	let loaded = false;

	onMount(() => {
		loaded = true;
	});
</script>

<main>
	<ProfileSummary />

	
</main>

<style lang="scss">
</style>

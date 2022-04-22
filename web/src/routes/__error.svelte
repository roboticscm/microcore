<script context="module">
	export const load = async ({ error, status }) => {
		return {
			props: {
				error: {
					message: error.message,
					status
				}
			}
		};
	};
</script>

<script>
	import { loadResource, locale, t } from '$src/lib/i18n';
	import '../../static/style/index.scss';
	import '$src/init';
	import { onMount } from 'svelte';
	import { Browser } from '$src/lib/browser';

	export let error;

	let count = 6;
	console.error(error);

	onMount(() => {
		loadResource(fetch)
			.then(() => {
				const savedLocale = localStorage.getItem('locale');
				if (savedLocale) {
					$locale = savedLocale;
				} else {
					$locale = Browser.getLocale();
				}
			})
			.finally(() => {
				const timer = setInterval(() => {
					count--;
					if (count < 2) {
						location.href = '/';
						clearInterval(timer);
					}
				}, 1000);
			});
	});
</script>

<div class="w-100 h-100 center-box" style="background: var(--base-background);">
	<div>
		<div class="center-text" style="font-size: 8rem;">{error.status}</div>
		<div class="center-text" style="font-size: 2rem;">{error.message}</div>
		<div class="center-text" style="font-size: 2rem;">
			{$t('sys.label.redirect to home page in')}
			{count}
			{$t('sys.label.seconds')}
		</div>
	</div>
</div>

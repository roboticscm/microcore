<script context="module">
	export const load = async ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script>
	import { t } from '$src/lib/i18n';
	import '../../static/style/index.scss';
	import '$src/init';
	import { onMount } from 'svelte';

	export let error;
	export let status;

	let count = 10;
	console.error(error);

	onMount(() => {
		setInterval(() => {
			count--;
			if (count < 1) {
				location.href = '/';
			}
		}, 1000);
	});
</script>

<div class="w-100 h-100 center-box" style="background: var(--base-background);">
	<div style="background: green;">
		<div class="center-text" style="font-size: 8rem;">{status}</div>
		<div class="center-text" style="font-size: 2rem;">{error.message}</div>
		<div class="center-text" style="font-size: 2rem;">
			{$t('sys.label.redirect to home page in')}
			{count}
			{$t('sys.label.seconds')}
		</div>
	</div>
</div>

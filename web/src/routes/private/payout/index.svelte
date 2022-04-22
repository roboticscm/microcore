<script>
	import { t } from '$src/lib/i18n';
	import { SNumber } from '$src/lib/snumber';
	import { Store } from './store';

	const store = new Store();

	let totalRevenueSharedPromise = store.getTotalRevenueShared();
</script>

<div>
	{$t('sys.label.total revenue shared')}:
	{#await totalRevenueSharedPromise}
		...
	{:then totalRevenueShared}
		{SNumber.toLocaleString(totalRevenueShared.data)}
	{/await}
</div>

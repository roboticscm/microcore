<script>
	import { SDate } from '$lib/date';
	import { t } from '$lib/i18n';
	import { config } from '$src/config/config';
	import { LoginInfo } from '$src/store/login-info';
	import Card from '$components/ui/card/index.svelte';
	import { onMount } from 'svelte';
	import { SNumber } from '$lib/snumber';
	import Snackbar from '$components/ui/snackbar/index.svelte';

	const { userId$ } = LoginInfo;
	const activePackageValue = 50000;
	const accountBalance = 1258;
	const profits = 258;
	const commission = 853;
	const registerDate = 1;

	$: referralsLink = `${config.fullDomain}?rid=${$userId$}`;
	let _window;
	let loaded = false;
	let snackbarRef;
	onMount(() => {
		_window = window;
		loaded = true;
	});

	const currencyFormat = (value) => {
		return '$' + SNumber.toLocaleString(value, 2, _window);
	};

	const onCopyToClipboard = () => {
		navigator.clipboard.writeText(referralsLink);
		snackbarRef.showCopyToClipboardSuccess(referralsLink);
	};
</script>

{#if loaded}
	<Snackbar bind:this={snackbarRef} />
	<div class="row card-list" style="row-gap: 6px;">
		<div class="col-xs-12 col-md-6">
			<Card
				title={$t('sys.label.active package value')}
				value={activePackageValue}
				valueFormatterCallback={currencyFormat}
			>
				<i slot="avatar" class="fas fa-landmark" />
			</Card>
		</div>

		<div class="col-xs-12 col-md-6">
			<Card
				title={$t('sys.label.account balance')}
				value={accountBalance}
				valueFormatterCallback={currencyFormat}
			>
				<i slot="avatar" class="fas fa-balance-scale" />
			</Card>
		</div>

		<div class="col-xs-12 col-md-6">
			<Card title={$t('sys.label.profits')} value={profits} valueFormatterCallback={currencyFormat}>
				<i slot="avatar" class="fas fa-chart-line" />
			</Card>
		</div>

		<div class="col-xs-12 col-md-6">
			<Card
				title={$t('sys.label.commission')}
				value={commission}
				valueFormatterCallback={currencyFormat}
			>
				<i slot="avatar" class="fas fa-hand-holding-usd" />
			</Card>
		</div>

		<div class="col-xs-24 col-md-12 large-top-margin">
			{$t('sys.label.register date')}: {SDate.convertMillisecondToDateString(registerDate)}
		</div>

		<div class="col-xs-24 col-md-12 large-top-margin three-dot-text">
			{$t('sys.label.referrals link')}:
		</div>

		<div class="col-xs-24 col-md-12 large-top-margin three-dot-text">
			<a title={$t('sys.label.click to copy')} on:click={onCopyToClipboard} class="link" href="##"
				>{referralsLink}</a
			>
		</div>
	</div>
	<div style="margin-top: 12px; margin-bottom: 16px;" class="dropdown__separator">
		<hr />
	</div>
{/if}

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
	import { TradingPackageFormBody } from './types';
	import { App } from '$src/lib/constants';
	import Button from '$components/ui/button/index.svelte';
	import { ButtonType } from '$components/ui/button/types';
	import { SNumber } from '$src/lib/snumber';
	import BinanceIcon from '$src/icons/binance.svelte';

	const resetTradingPackageForm = () => new Form(new TradingPackageFormBody());

	let tradingPackageForm = resetTradingPackageForm();
	let submitRunning = false;
	let submitBinanceRunning = false;
	let submitCoinPaymentsRunning = false;
	const packageTradingCost = 10;
	const minAmount = 10;
	const maxAmount = 5000;
	const accountBalance = 1258;
	let loaded = false;

	$: totalAmount = +(tradingPackageForm.amount || 0) * packageTradingCost;
	$: tradingAvailable = Math.floor((accountBalance || 0) / (packageTradingCost || 1));

	const doBuyFromBalanceAccount = () => {};

	const doBuyFromBinancePay = () => {};

	const doBuyFromCoinPayments = () => {};

	onMount(() => {
		loaded = true;
	});
</script>

<main>
	<ProfileSummary />

	<form class="row">
		<div class="col-24">
			<div class="flex-wrap large-padding" style="padding-left: 0;">
				<div>{$t('sys.label.trading package cost')}:{@html App.SPACE_CODE}</div>
				<div class="important-text">${packageTradingCost}</div>
			</div>

			<div class="flex-wrap large-padding" style="padding-bottom: 0; padding-left: 0;">
				<div>{$t('sys.label.trading available')}:{@html App.SPACE_CODE}</div>
				<div class="important-text">
					${(loaded && SNumber.toLocaleString(tradingAvailable)) || '...'}
				</div>
			</div>

			<div>
				<TextInput
					type="text"
					name="amount"
					bind:value={tradingPackageForm.amount}
					required={true}
					label={$t('sys.label.amount packages') + ` (${minAmount} - ${maxAmount})`}
					placeholder={$t('sys.label.enter number of packages') + ` (${minAmount} - ${maxAmount})`}
				/>
				<Error form={tradingPackageForm} field="amount" />
			</div>

			<div class="flex-wrap large-padding" style="padding-bottom: 0; padding-left: 0;">
				<div>{$t('sys.label.total amount')}:{@html App.SPACE_CODE}</div>
				<div class="important-text">
					{(loaded && SNumber.toLocaleString(totalAmount, 2)) || '...'} (USDT)
				</div>
			</div>

			<div style="margin-top: 16px; column-gap: 12px; row-gap: 12px; " class="flex-wrap">
				<Button
					showIcon={false}
					running={submitBinanceRunning}
					on:click={doBuyFromBalanceAccount}
					addClassName="btn-main btn-large"
					type="submit"
					style="margin: 0; flex: 1; min-width: 200px !important;"
					text={$t('sys.button.buy from balance account')}
					btnType={ButtonType.custom}
				/>

				<Button
					showIcon={true}
					running={submitCoinPaymentsRunning}
					on:click={doBuyFromBinancePay}
					addClassName="btn-main btn-large"
					type="button"
					style="margin: 0; flex: 1; min-width: 200px !important; background: var(--button-secondary-background);"
					text={$t('sys.button.buy from binance pay')}
					btnType={ButtonType.custom}
				>
					<svelte:fragment slot="icon"><BinanceIcon /></svelte:fragment>
				</Button>

				<Button
					showIcon={true}
					running={submitRunning}
					on:click={doBuyFromCoinPayments}
					addClassName="btn-main btn-large"
					type="button"
					style="margin: 0; flex: 1; min-width: 200px !important; background: var(--button-tertiary-background); color: var(--button-tertiary-color);"
					text={$t('sys.button.buy from coinpayments')}
					btnType={ButtonType.custom}
				>
					<svelte:fragment slot="icon"
						><img
							style="width:20px; height: 20px;"
							src="/images/coinpayment-logo.png"
							alt="logo"
						/></svelte:fragment
					>
				</Button>
			</div>
		</div>
	</form>
</main>

<style lang="scss">
</style>

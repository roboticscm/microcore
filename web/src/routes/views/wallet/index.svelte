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
	import { FormBody, WithdrawFormBody } from './types';
	import { App } from '$src/lib/constants';
	import Button from '$components/ui/button/index.svelte';
	import { ButtonType } from '$components/ui/button/types';
	import { SNumber } from '$src/lib/snumber';

	let tabList = [];
	$: if ($locale) {
		tabList = [
			{
				id: 'DEPOSIT',
				title: $t('sys.label.deposit')
			},
			{
				id: 'WITHDRAW',
				title: $t('sys.label.withdraw')
			}
		];
	}

	let activeTab;
	$: if (!activeTab && tabList && tabList.length > 0) {
		activeTab = tabList[0].id;
	}

	const ownerWalletAddress = 'THSzPB84GShkCx9vkKxcPaRtAQr59KEX3Y';
	const resetForm = () => new Form(new FormBody());
	const resetWithdrawForm = () => new Form(new WithdrawFormBody());

	let form = resetForm();
	let withdrawForm = resetWithdrawForm();
	let sendEmailRunning = false;
	let submitRunning = false;
	let accountBalance = 1258;
	let loaded = false;

	const doSendEmail = () => {};

	const doDeposit = () => {};

	const doWithdraw = () => {};

	const doWithdrawSendEmail = () => {};

	const showAddressBook = () => {};

	onMount(() => {
		loaded = true;
	});
</script>

<main>
	<ProfileSummary />

	<Tabs {tabList} bind:activeTab>
		{#if activeTab === 'DEPOSIT'}
			<form class="row">
				<div class="col-24">
					<div class="flex-wrap large-padding" style="padding-left: 0;">
						<div>{$t('sys.label.coin code')}:{@html App.SPACE_CODE}</div>
						<div class="important-text">Tether (USDT)</div>
					</div>

					<div class="flex-wrap large-padding" style="padding-left: 0;">
						<div>{$t('sys.label.coin network')}:{@html App.SPACE_CODE}</div>
						<div class="important-text">TRC20</div>
					</div>

					<div class="flex-wrap large-padding" style="padding-bottom: 0; padding-left: 0;">
						<div>{$t('sys.label.to wallet address')}:{@html App.SPACE_CODE}</div>
						<div title={ownerWalletAddress} class="important-text three-dot-text">
							{ownerWalletAddress}
						</div>
					</div>

					<div class="large-left-padding" style="padding-left: 0;">
						<TextInput
							type="search"
							name="firstName"
							bind:value={form.depositAmount}
							required={true}
							label={$t('sys.label.deposit amount')}
							placeholder={$t('sys.label.enter deposit amount')}
						/>
						<Error {form} field="amount" />
					</div>

					<div class="center-box" style="margin-top: 16px;">
						<Button
							showIcon={false}
							running={submitRunning}
							on:click={doDeposit}
							addClassName="btn-main btn-large btn-submit"
							type="submit"
							text={$t('sys.button.submit')}
							btnType={ButtonType.custom}
						/>
					</div>
				</div>
			</form>
		{:else}
			<form class="row">
				<div class="col-24">
					<div class="large-left-padding" style="padding-left: 0;">
						<TextInput
							type="text"
							name="amount"
							bind:value={withdrawForm.amount}
							required={true}
							label={$t('sys.label.withdraw amount') +
								` (${$t('sys.label.balance')}: ${
									(loaded && SNumber.toLocaleString(accountBalance, 2)) || '...'
								})`}
							placeholder={$t('sys.label.enter withdraw amount')}
						/>
						<Error form={withdrawForm} field="amount" />
					</div>

					<div class="flex-base-line  large-left-padding" style="padding-left: 0;">
						<TextInput
							type="search"
							name="withdrawWalletAddress"
							bind:value={withdrawForm.withdrawWalletAddress}
							required={true}
							label={$t('sys.label.withdraw wallet address')}
							placeholder={$t('sys.label.enter withdraw wallet address')}
						/>
						<Error form={withdrawForm} field="withdrawWalletAddress" />
						<Button
							showIcon={false}
							style="margin-right: 0; padding-right: 0;"
							on:click={showAddressBook}
							type="button"
							text="+"
							isDense={true}
							btnType={ButtonType.custom}
						/>
					</div>

					<div class="large-left-padding" style="padding-left: 0;">
						<TextInput
							type="password"
							name="password"
							bind:value={withdrawForm.password}
							required={true}
							label={$t('sys.label.password')}
							placeholder={$t('sys.label.enter withdraw password')}
						/>
						<Error form={withdrawForm} field="password" />
					</div>

					<div class="flex-base-line large-left-padding" style="padding-left: 0;">
						<TextInput
							type="text"
							name="emailCode"
							bind:value={withdrawForm.emailCode}
							label={$t('sys.label.email code')}
							required={true}
							placeholder={$t('sys.label.enter email code')}
						/>
						<Error form={withdrawForm} field="emailCode" />
						<Button
							showIcon={false}
							style="margin-right: 0;"
							running={sendEmailRunning}
							on:click={doWithdrawSendEmail}
							type="button"
							text={$t('sys.button.send email')}
							btnType={ButtonType.custom}
						/>
					</div>

					<div class="large-left-padding" style="padding-left: 0;">
						<TextInput
							type="text"
							name="googleTotp"
							bind:value={withdrawForm.googleTotp}
							label={$t('sys.label.google authenticator (TOTP)')}
							required={true}
							placeholder={$t('sys.label.enter google authenticator (TOTP)')}
						/>
						<Error form={withdrawForm} field="googleTotp" />
					</div>

					<div class="center-box" style="margin-top: 16px;">
						<Button
							showIcon={false}
							running={submitRunning}
							on:click={doWithdraw}
							addClassName="btn-main btn-large btn-submit"
							type="submit"
							text={$t('sys.button.submit')}
							btnType={ButtonType.custom}
						/>
					</div>
				</div>
			</form>
		{/if}
	</Tabs>
</main>

<style lang="scss">
	.btn-submit {
		width: 50% !important;
	}

	@media screen and (max-width: 768px) {
		.btn-submit {
			width: 100% !important;
		}
	}
</style>

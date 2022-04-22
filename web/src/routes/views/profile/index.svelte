
<script>
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import ProfileSummary from '$components/profile-summary/index.svelte';
	import TextInput from '$components/ui/text-input/index.svelte';
	import Error from '$components/ui/error/index.svelte';
	import Button from '$components/ui/button/index.svelte';
	import { Partner } from './types';
	import Form from '$lib/form/form';
	import ImagePicker from '$components/ui/image-picker/index.svelte';
	import { ButtonType } from '$components/ui/button/types';

	let isRunning;

	const resetForm = () => new Form(new Partner());
	let form = resetForm();
	onMount(() => {});

	const doUpsert = () => {};
</script>

<main>
	<ProfileSummary />

	<div class="row" style="column-gap: 6px;">
		<div class="col-xl-24 col-xx-13">
			<div class="sub-title">{$t('sys.label.my profile')}</div>
			<form>
				<div class="row">
					<div class="col-xs-24 col-lg-6 center-box default-padding" style="background: var(--header-background);">
						<div style="min-width: 120px; width: 120px; height: 120px;">
							<ImagePicker />
						</div>
					</div>

					<div class="col-xs-24 col-lg-18">
						<div class="row">
							<div class="col-xs-24 col-lg-12">
								<TextInput
									type="search"
									name="firstName"
									bind:value={form.firstName}
									label={$t('sys.label.first name')}
									required = { true }
									placeholder={$t('sys.label.type your first name')}
								/>
								<Error {form} field="firstName" />
							</div>
							<div class="col-xs-24 col-lg-12">
								<TextInput
									type="search"
									name="lastName"
									bind:value={form.lastName}
									label={$t('sys.label.last name')}
									placeholder={$t('sys.label.type your last name')}
								/>
								<Error {form} field="lastName" />
							</div>

							<div class="col-xs-24 col-lg-12">
								<TextInput
									type="search"
									name="birthday"
									bind:value={form.birthday}
									label={$t('sys.label.birthday')}
									placeholder={$t('sys.label.dd/mm/yyyy')}
								/>
								<Error {form} field="birthday" />
							</div>
							<div class="col-xs-24 col-lg-12">
								<TextInput
									type="search"
									name="nationality"
									bind:value={form.nationality}
									label={$t('sys.label.nationality')}
									placeholder={$t('sys.label.type your nationality')}
								/>
								<Error {form} field="nationality" />
							</div>

							<div class="col-xs-24">
								<TextInput
									type="search"
									name="email"
									bind:value={form.email}
									required = { true }
									label={$t('sys.label.email')}
									placeholder={$t('sys.label.type your email')}
								/>
								<Error {form} field="email" />
							</div>
							<div class="col-24 center-box">
								<Button
									showIcon={false}
									running={isRunning}
									on:click={doUpsert}
									style="margin-top: 6px;"
									type="button"
									text={$t('sys.button.update')}
									btnType={ButtonType.custom}
								/>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>

		<div class="col-1 center-box">
			<div class="w-100 h-100 vertical-line" />
		</div>
		<div class="col-xl-24 col-xx-10">
			<div class="sub-title">
				{$t('sys.label.security')}
			</div>
			<div style="display: flex;" class="baseline default-padding">
				{$t('sys.label.account kyc')}
				<Button
					type="button"
					showIcon={false}
					icon="<i class='fas fa-id-card' aria-hidden='true'/>"
					text={$t('sys.button.confirm')}
				/>
			</div>
			<div style="display: flex;" class="baseline default-padding">
				{$t('sys.label.password')}
				<Button
					type="button"
					showIcon={false}
					icon="<i class='fas fa-key'/>"
					text={$t('sys.button.change')}
				/>
			</div>
			<div style="display: flex;" class="baseline default-padding">
				{$t('sys.label.2fa setting')}
				<Button
					type="button"
					showIcon={false}
					icon="<i class='fas fa-user-shield'/>"
					text={$t('sys.button.setup')}
				/>
			</div>
			<div>
				{$t('sys.label.wallet')}<i class="link default-padding fas fa-pencil-alt" />
			</div>
			<div style="display: flex;" class="baseline default-padding">
				{$t('sys.label.tether (trc-20)')}
				{form.trc20Address}
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.vertical-line {
		width: 2px;
		max-width: 2px;
		padding: 0;
		background: var(--border-color);
	}

	@media screen and (max-width: 1366px) {
		.vertical-line {
			display: none;
		}

		.sub-title {
			margin-top: 12px;
			margin-bottom: 12px;
		}
	}
</style>

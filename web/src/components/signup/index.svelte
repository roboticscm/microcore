<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import TextInput from '$components/ui/text-input/index.svelte';
	import Button from '$components/ui/button/index.svelte';
	import { ButtonType } from '$components/ui/button/types';
	import { App } from '$lib/constants';
	import Locale from '$components/locale/index.svelte';
	import Form from '$lib/form/form';
	import { Partner } from './types';
	import { validate } from './validation';
	import Error from '$components/ui/error/index.svelte';
	import { Store } from './store';
	import Snackbar from '$components/ui/snackbar/index.svelte';
	import _ from 'lodash';
	import { config } from '$src/config/config';
	import { goto } from '$app/navigation';
	import { getTitle } from '$src/lib/url';

	export let refId = '';

	const dispatch = createEventDispatcher();
	const store = new Store();

	const resetForm = () => {
		const f = new Form(new Partner());
		if (refId) {
			f.referralId = refId;
		}
		return f;
	};
	let loaded = false;
	let form = resetForm();
	let isRunning = false;
	let snackbarRef, usernameRef;

	onMount(() => {
		loaded = true;
		setTimeout(() => {
			usernameRef && usernameRef.focus();
		}, 300);
	});

	const validateForm = () => {
		// client validation
		form.errors.errors = form.recordErrors(validate(form));
		if (form.errors.any()) {
			return false;
		}
		return true;
	};

	const doSignUp = () => {
		if (!validateForm()) {
			return false;
		}
		isRunning = true;
		store
			.signUp(form.data())
			.then(async (res) => {
				snackbarRef.showSignupSuccess();
				setTimeout(() => {
					sessionStorage.setItem('currentPage', 'LOGIN');
					location.href = '/';
				}, 3000);
			})
			.catch((err) => {
				if (err.unknownError) {
					snackbarRef.showUnknownError(
						_.isString(err) ? $t(err) : $t(err.unknownError) + ' ' + $t(err.errorDetail)
					);
				} else {
					form.errors.errors = form.recordErrors(err);
				}
			})
			.finally(() => (isRunning = false));
	};
</script>

<Snackbar bind:this={snackbarRef} />

<svelte:head>
	<title>{getTitle($t('sys.label.sign up'))}</title>
</svelte:head>
{#if loaded}
	<form
		novalidate
		on:submit|preventDefault
		class="w-100 h-100 center-box default-radius-border"
		on:keydown={(event) => {
			form.errors.clear(event.target.name);
			form.errors.errors = {};
		}}
	>
		<div
			style="position: relative;"
			class="row container default-box-shadow default-padding default-radius-border"
		>
			<Locale />
			<div class="col-md-24 col-lg-12 very-large-padding welcome">
				<div class="center-text large-padding title-text">
					{$t('sys.label.welcome')}
				</div>
				<div class="center-text large-padding form-avatar">
					<img src="/images/logo.png" class="logo" alt="Logo" />
				</div>
			</div>

			<div
				class="col-md-24 col-lg-12 very-large-padding"
				style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;"
			>
				<div>
					<div class="center-text large-padding title-text login-title">
						{$t('sys.label.member registration')}
					</div>
					<div>
						<TextInput
							bind:this={usernameRef}
							type="search"
							showSuffixIcon={true}
							suffixIcon="<i class='far fa-id-badge'>"
							name="username"
							bind:value={form.username}
							label={$t('sys.label.username')}
							required={true}
							placeholder={$t('sys.label.type your username')}
						/>
						<Error {form} field="username" />
					</div>
					<div>
						<TextInput
							type="search"
							showSuffixIcon={true}
							suffixIcon="<i class='fa fa-envelope' aria-hidden='true'></i>"
							name="email"
							bind:value={form.email}
							required={true}
							label={$t('sys.label.email')}
							placeholder={$t('sys.label.type your email to activate the account')}
						/>
						<Error {form} field="email" />
					</div>
					<div>
						<TextInput
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="password"
							bind:value={form.password}
							type="password"
							required={true}
							label={$t('sys.label.password')}
							placeholder={$t('sys.label.enter your password')}
						/>
						<Error {form} field="password" replaceParams={[config.minPasswordLength]} />
					</div>

					<div>
						<TextInput
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="confirmPassword"
							bind:value={form.confirmPassword}
							type="password"
							required={true}
							label={$t('sys.label.confirm password')}
							placeholder={$t('sys.label.retype your password')}
						/>
						<Error {form} field="confirmPassword" />
					</div>

					<div class="right-box nowrap" style="padding-top: 26px;">
						{$t('sys.label.referral code')}:{@html App.SPACE_CODE}
						<input
							name="referralId"
							style="width: 160px;"
							bind:value={form.referralId}
							class="form-control"
						/>
					</div>
					<div class="right-box">
						<Error {form} field="referralId" />
					</div>

					<div class="center-box">
						<Button
							disabled={form.errors.any()}
							running={isRunning}
							on:click={doSignUp}
							style="width: 80%; margin-top: 30px;"
							type="submit"
							text={$t('sys.button.sign up now')}
							icon="<i class='fas fa-file-signature'>"
							addClassName="btn-main btn-large"
							btnType={ButtonType.login}
						/>
						<Error {form} field="error" />
					</div>
				</div>

				<div>
					<div class="center-box" style="padding-top: 50px;">
						{$t('sys.label.or back to')}
					</div>
					<div class="center-box">
						<Button
							on:click={() => {
								dispatch('changeMode', { mode: 'LOGIN' });
								goto('/');
							}}
							style="width: 60%; margin-top: 10px;"
							type="button"
							btnType={ButtonType.login}
						/>
					</div>
				</div>
			</div>
		</div>
	</form>
{:else}
	<div class="load-screen">
		<div class="loading">Loading...</div>
	</div>
{/if}

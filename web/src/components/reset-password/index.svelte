<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import TextInput from '/src/components/ui/text-input/index.svelte';
	import Button from '/src/components/ui/button/index.svelte';
	import { ButtonType } from '/src/components/ui/button/types';
	import Locale from '/src/components/locale/index.svelte';
	import Form from '$lib/form/form';
	import { Partner } from './types';
	import { validate } from './validation';
	import Error from '/src/components/ui/error/index.svelte';
	import { Store } from './store';
	import Snackbar from '/src/components/ui/snackbar/index.svelte';
	import _ from 'lodash';
	import { goto } from '$app/navigation';
	import { Browser } from '$lib/browser';
	import { getPublicIp } from '$lib/util';
	import { getUrlParam } from '$lib/url';
	import { config } from '/src/config/config';

	const dispatch = createEventDispatcher();
	const store = new Store();

	const resetForm = () => new Form(new Partner());
	let loaded = false;
	let form = resetForm();
	let isRunning = false;
	let snackbarRef, passwordRef;
	let publicIp;

	onMount(async () => {
		loaded = true;
		publicIp = await getPublicIp();
		setTimeout(() => {
			passwordRef && passwordRef.focus && passwordRef.focus();
		}, 300);
	});

	const validateForm = () => {
		// client validation
		form.session = getUrlParam('session');
		form.errors.errors = form.recordErrors(validate(form));
		if (form.errors.any()) {
			return false;
		}
		return true;
	};

	const doResetPassword = async () => {
		if (!validateForm()) {
			return false;
		}
		isRunning = true;
		
		store
			.resetPassword({...form.data(), ip: publicIp, deviceDesc: Browser.getAgentDesc(), })
			.then(async (res) => {
				if (res.status > 400) {
					const err = await res.json();
					if(err.unknownError) {
						snackbarRef.showUnknownError($t(err.unknownError));
					} else {
						form.errors.errors = form.recordErrors(err.error);
					}
				} else {
					snackbarRef.showResetPasswordSuccess();
					sessionStorage.setItem('currentPage', 'LOGIN');
					setTimeout(() => {
						goto('/');
					}, 3000)
				}
			})
			.catch((err) => {
				snackbarRef.showUnknownError(_.isString(err) ? $t(err) : $t(err.unknownError));
			})
			.finally(() => (isRunning = false));
	};
</script>

<Snackbar bind:this={snackbarRef} />

<svelte:head>
	<title>{$t('sys.label.reset password')}</title>
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
						{$t('sys.label.reset password')}
					</div>
					<div>
						<TextInput
							bind:this={passwordRef}
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="password"
							bind:value={form.password}
							type="password"
							label={$t('sys.label.new password')}
							placeholder={$t('sys.label.enter new password')}
						/>
						<Error {form} field="password" replaceParams={[config.minPasswordLength]} />
					</div>
					<div style="padding-top: 16px;">
						<TextInput
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="confirmPassword"
							bind:value={form.confirmPassword}
							type="password"
							label={$t('sys.label.confirm password')}
							placeholder={$t('sys.label.enter your password again')}
						/>
						<Error {form} field="confirmPassword" />
					</div>

					<div class="center-box">
						<Button
							running={isRunning}
							on:click={doResetPassword}
							style="width: 80%; margin-top: 40px;"
							type="submit"
							text={$t('sys.button.change password')}
							icon='<i class="fas fa-sync"/>'
							addClassName="btn-main btn-large"
						/>
					</div>
				</div>
				<div>
					<div class="center-box" style="padding-top: 50px;">
						{$t('sys.label.or back to')}
					</div>
					<div class="center-box">
						<Button
							on:click={() => {dispatch('changeMode', { mode: 'LOGIN' }); goto ('/');} }
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

<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import TextInput from '$components/ui/text-input/index.svelte';
	import Error from '$components/ui/error/index.svelte';
	import Button from '$components/ui/button/index.svelte';
	import { ButtonType } from '$components/ui/button/types';
	import Locale from '$components/locale/index.svelte';
	import Form from '$lib/form/form';
	import { Partner } from './types';
	import { validate } from './validation';

	import { Store } from './store';
	import Snackbar from '$components/ui/snackbar/index.svelte';
	import _ from 'lodash';
	import { goto } from '$app/navigation';


	const dispatch = createEventDispatcher();
	const store = new Store();

	const resetForm = () => new Form(new Partner());
	let loaded = false;
	let form = resetForm();
	let isRunning = false;
	let snackbarRef, emailRef;

	onMount(async () => {
		loaded = true;
		setTimeout(() => {
			emailRef && emailRef.focus();
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

	const doGetNewPassword = async () => {
		if (!validateForm()) {
			return false;
		}
		isRunning = true;
		const subject = $t('sys.msg.get new password');
		const html = '<h3>' + $t('sys.msg.please click on the link bellow to reset your password') + '</h3>';

		store
			.forgotPassword({...form.data(), subject, html})
			.then(async (res) => {
				if (res.status > 400) {
					const err = await res.json();
					if(err.unknownError) {
						snackbarRef.showUnknownError($t(err.unknownError));
					} else {
						form.errors.errors = form.recordErrors(err.error);
					}
				} else {
					snackbarRef.showSendMailToResetPasswordSuccess();
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
	<title>{$t('sys.label.forgot password')}</title>
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
						{$t('sys.label.forgot password')}
					</div>
					<div>
						<TextInput
							bind:this={emailRef}
							type="search"
							showSuffixIcon={true}
							suffixIcon="<i class='far fa-id-badge'>"
							name = "username"
							bind:value={form.email}
							label={$t('sys.label.email')}
							placeholder={$t('sys.label.type your email')}
						/>
						<Error {form} field="email" />
					</div>
					
					<div class="center-box">
						<Button
							running={isRunning}
							on:click={doGetNewPassword}
							style="width: 80%; margin-top: 40px;"
							type="submit"
							text="sys.button.get new password"
							addClassName="btn-main btn-large"
							btnType={ButtonType.custom}
						/>
					</div>
				</div>
				<div>
					<div class="center-box" style="padding-top: 50px;">
						{$t('sys.label.or back to')}
					</div>
					<div class="center-box">
						<Button
							on:click={() => {dispatch('changeMode', { mode: 'LOGIN' }); goto ('/');}}
							style="width: 60%; margin-top: 10px;"
							type="button"
							btnType={ButtonType.login}
						/>
					</div>
					<div class="center-box">
						<Button
							on:click={() => {dispatch('changeMode', { mode: 'SIGN_UP' }); goto ('/');}}
							style="width: 60%; margin-top: 10px;"
							type="button"
							icon="<i class='fas fa-file-signature'>"
							text="sys.button.sign up now"
							btnType={ButtonType.custom}
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


<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import TextInput from '/src/components/ui/text-input/index.svelte';
	import Button from '/src/components/ui/button/index.svelte';
	import { ButtonType } from '/src/components/ui/button/types';
	import { App } from '$lib/constants';
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
	import { LoginInfo } from '/src/store/login-info';
	import { saveToken } from '$lib/local-storage';
	import { getPublicIp } from '$lib/util';
	import QRCode from 'qrcode';
	import { config } from '/src/config/config';
	
	const dispatch = createEventDispatcher();
	const store = new Store();

	const resetForm = () => new Form(new Partner());
	let loaded = false;
	let form = resetForm();
	let isRunning = false;
	let snackbarRef, usernameRef, qrCodeRef;
	let publicIp;

	onMount(async () => {
		loaded = true;
		publicIp = await getPublicIp();
		setTimeout(() => {
			usernameRef && usernameRef.focus && usernameRef.focus();
		}, 300);
		generateQrCode();
	});

	const validateForm = () => {
		// client validation
		form.errors.errors = form.recordErrors(validate(form));
		if (form.errors.any()) {
			return false;
		}
		return true;
	};

	const doLogin = async () => {
		if (!validateForm()) {
			return false;
		}
		isRunning = true;
		store
			.login({...form.data(), ip: publicIp, deviceId: Browser.getBrowserID()})
			.then(async (res) => {
				if (res.status > 400) {
					const err = await res.json();
					if(err.unknownError) {
						snackbarRef.showUnknownError($t(err.unknownError));
					} else {
						form.errors.errors = form.recordErrors(err.error);
					}
					
				} else {
					snackbarRef.showLoginSuccess();
					const body = await res.json();
					
					LoginInfo.userId$.next(body.loginInfo.userId);
					LoginInfo.username$.next(body.loginInfo.username);
					LoginInfo.displayName$.next(body.loginInfo.displayName);
					LoginInfo.accountAvatar$.next(body.loginInfo.accountAvatar);
					//TODO
					localStorage.setItem('userId', body.loginInfo.userId);
					localStorage.setItem('username', body.loginInfo.username );
					localStorage.setItem('displayName', body.loginInfo.displayName || '');
					
					saveToken({
						remember: true,
						accessToken: body.accessToken,
						refreshToken: body.refreshToken,
					})
					setTimeout(() => {
						location.reload();
						// goto('/views/dashboard')
					}, 2000);
				}
			})
			.catch((err) => {
				snackbarRef.showUnknownError(_.isString(err) ? $t(err) : $t(err.unknownError));
			})
			.finally(() => (isRunning = false));
	};

	const generateQrCode = () => {
		store.getNewId().then((value) => {
			QRCode.toCanvas(qrCodeRef, `${value}`, { margin: 0, version: 3 }, (error) => {
				if (error) {
					console.error(error)
				}
			});
		})
  	}
</script>

<Snackbar bind:this={snackbarRef} />

<svelte:head>
	<title>{$t('sys.label.login')}</title>
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
						{$t('sys.label.member login')}
					</div>
					<div>
						<TextInput
							bind:this={usernameRef}
							type="search"
							showSuffixIcon={true}
							suffixIcon="<i class='far fa-id-badge'>"
							name = "username"
							bind:value={form.username}
							label={$t('sys.label.username')}
							placeholder={$t('sys.label.type your username')}
						/>
						<Error {form} field="username" />
					</div>
					<div style="padding-top: 16px;">
						<TextInput
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="password"
							bind:value={form.password}
							type="password"
							label={$t('sys.label.password')}
							placeholder={$t('sys.label.enter your password')}
						/>
						<Error {form} field="password" replaceParams={[config.minPasswordLength]} />
					</div>

					<div class="right-box link" style="padding-top: 16px;" on:click={() => {dispatch('changeMode', { mode: 'FORGOT_PASSWORD' }); goto ('/');}}>
						{$t('sys.label.forgot Password')}
					</div>

					<div class="center-box">
						<Button
							running={isRunning}
							on:click={doLogin}
							style="width: 80%; margin-top: 40px;"
							type="submit"
							addClassName="btn-main btn-large"
							btnType={ButtonType.login}
						/>
					</div>
				</div>
				<div class="qr-code" style="margin-top: 6px;">
					<canvas bind:this={qrCodeRef} />
				</div>
				<div>
					<div class="center-box" style="padding-top: 12px;">
						{$t('sys.label.or back to')}
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


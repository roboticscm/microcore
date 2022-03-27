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
	import { Store } from './store'
	import Snackbar from '/src/components/ui/snackbar/index.svelte';
	import _ from 'lodash';

	const dispatch = createEventDispatcher();
	const store = new Store();

	const resetForm = () => new Form(new Partner());
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
		store.signUp(form.data()).then(async (res) => {
			if(res.status > 300) {
				const err = await res.json();
				form.errors.errors = form.recordErrors(err.error)
			} else {
				snackbarRef.showSaveSuccess();
			}
			
		}).catch((err) => {
			console.log(err)
			snackbarRef.showUnknownError(_.isString(err) ? $t(err) : $t(err.unknownError))
			
		}).finally(() => isRunning = false);
	};
</script>

<Snackbar bind:this={snackbarRef}/>

<svelte:head>
	<title>{$t('sys.label.sign up')}</title>
</svelte:head>
{#if loaded}
	<form novalidate on:submit|preventDefault
		class="w-100 h-100 center-box login-background default-radius-border"
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
				<div class="center-text large-padding avatar">
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
							style="font-size: 1.3rem;"
							type="search"
							showSuffixIcon={true}
							suffixIcon="<i class='far fa-id-badge'>"
							name="username"
							bind:value={form.username}
							label={$t('sys.label.username')}
							placeholder={$t('sys.label.type your username')}
						/>
						<Error {form} field="username"/>
					</div>
					<div style="padding-top: 16px;">
						<TextInput
							style="font-size: 1.3rem;"
							type="search"
							showSuffixIcon={true}
							suffixIcon="<i class='far fa-id-badge'>"
							name="email"
							bind:value={form.email}
							label={$t('sys.label.email')}
							placeholder={$t('sys.label.type your email to activate the account')}
						/>
						<Error {form} field="email"/>
					</div>
					<div style="padding-top: 16px;">
						<TextInput
							style="font-size: 1.3rem;"
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="password"
							bind:value={form.password}
							type="password"
							label={$t('sys.label.password')}
							placeholder={$t('sys.label.enter your password')}
						/>
						<Error {form} field="password"/>
					</div>

					<div style="padding-top: 16px;">
						<TextInput
							style="font-size: 1.3rem;"
							showSuffixIcon={true}
							suffixIcon="<i class='fas fa-key'>"
							name="confirmPassword"
							bind:value={form.confirmPassword}
							type="password"
							label={$t('sys.label.confirm password')}
							placeholder={$t('sys.label.retype your password')}
						/>
						<Error {form} field="confirmPassword"/>
					</div>

					<div class="right-box nowrap" style="padding-top: 26px;">
						{$t('sys.label.referral code')}:{@html App.SPACE_CODE}
						<input style="width: 190px;" bind:value={form.referralId} class="form-control" />
					</div>

					<div class="center-box">
						<Button
							disabled = {form.errors.any()}
							running = { isRunning }
							on:click={doSignUp}
							style="width: 80%; margin-top: 30px;"
							type="submit"
							text={$t('sys.button.sign up now')}
							icon="<i class='fas fa-file-signature'>"
							addClassName="btn-main btn-large"
							btnType={ButtonType.login}
						/>
						<Error {form} field="error"/>
					</div>
				</div>

				<div>
					<div class="center-box" style="padding-top: 50px;">
						{$t('sys.label.back to')}
					</div>
					<div class="center-box">
						<Button
							on:click={() => dispatch('changeMode', { signupMode: false })}
							style="width: 50%; margin-top: 10px;"
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

<style lang="scss">
	input {
		font-size: 1.3rem;
	}
	.login-background {
		background-image: url('/images/login-background.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		opacity: 0.9;
	}
	.load-screen {
		background: #000;
		opacity: 0.8;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.loading {
		color: #fff;
		margin: 0 auto;
	}

	.login-title {
		display: block;
	}

	.welcome {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;

		&::after {
			position: absolute;
			content: '';
			height: 90%;
			width: 2px;
			right: 0;
			background: var(--border-light-color);
		}
	}

	.logo {
		width: 200px;
		height: 200px;
	}

	.container {
		overflow: auto;
		font-size: 1.3rem;
		height: 80%;
		width: 75%;
		background-color: rgba(255, 255, 255, 0.99);
	}

	@media screen and (max-width: 1024px) {
		.login-title {
			display: none;
		}

		.welcome {
			justify-content: flex-start;
			&::after {
				display: none;
			}
		}

		.logo {
			width: 100px;
			height: 100px;
		}

		.container {
			height: 80%;
			width: 60%;
		}
	}

	@media screen and (max-width: 768px) {
		.login-title {
			display: none;
		}

		.welcome {
			justify-content: flex-start;
		}

		.logo {
			width: 100px;
			height: 100px;
		}

		.container {
			height: 100%;
			width: 100%;
		}
	}
</style>

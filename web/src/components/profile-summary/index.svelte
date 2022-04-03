<script>
	import { SDate } from '$lib/date';
	import { t } from '$lib/i18n';
	import { config } from '/src/config/config';
	import { LoginInfo } from '/src/store/login-info';
	import Card from '/src/components/ui/card/index.svelte';
	import { onMount } from 'svelte';
    import { SNumber } from '$lib/snumber';

	const activePackageValue = 50000;
	const accountBalance = 1258;
	const profits = 258;
	const commission = 853;
	const registerDate = 1;
	const referralsLink = `${config.fullDomain}?rid=${LoginInfo.userId}`;
    let _window;
    let loaded = false;
	onMount(() => {
        _window = window;
        loaded = true;
    });

	const currencyFormat = (value) => {
		return SNumber.toLocaleString(value, 2, _window);
	};
</script>

{#if loaded}
    <div class="row" style="column-gap: 0px; row-gap: 6px;">
        <div class="col-xs-12 col-md-6">
            <Card
                title={$t('sys.label.active package value')}
                value={activePackageValue}
                valueFormatterCallback={currencyFormat}
            />
        </div>

        <div class="col-xs-12 col-md-6">
            <Card
                title={$t('sys.label.account balance')}
                value={accountBalance}
                valueFormatterCallback={currencyFormat}
            />
        </div>

        <div class="col-xs-12 col-md-6">
            <Card
                title={$t('sys.label.profits')}
                value={profits}
                valueFormatterCallback={currencyFormat}
            />
        </div>

        <div class="col-xs-12 col-md-6">
            <Card
                title={$t('sys.label.commission')}
                value={commission}
                valueFormatterCallback={currencyFormat}
            />
        </div>

        <div class="col-xs-24 col-md-12 large-top-margin" >
            {$t('sys.label.register date')}: {SDate.convertMillisecondToDateString(registerDate)}
        </div>

        <div class="col-xs-24 col-md-12 large-top-margin">
            {$t('sys.label.referrals link')}: <a class="link" href="{referralsLink}">{referralsLink}</a>
        </div>
    </div>
    <div  style="margin-top: 12px;" class="dropdown__separator">
        <hr />
    </div>
{/if}
<script>
	import { App } from '$src/lib/constants';
	import { onMount } from 'svelte';
	import { t } from '$src/lib/i18n';
	import { AppStore } from '$src/store/app';
	import { Store } from './store';
	import { SNumber } from '$src/lib/snumber';
	import { goto } from '$app/navigation';
    import Line from 'svelte-chartjs/src/Line.svelte';

	const { formLoading$ } = AppStore;

	const store = new Store();

	let totalActivedMembersPromise = store.getTotalActivedMembers();
	let totalDepositedPromise = store.getTotalDeposited();
	let totalPayoutPromise = store.getTotalPayout();
	let totalRequestPayoutPromise = store.getTotalRequestPayout();

	const summaryList = [
		{
			promisedValue: totalActivedMembersPromise,
			label: 'sys.label.total actived members',
			pathToViewDetail: 'members'
		},
		{
			promisedValue: totalDepositedPromise,
			label: 'sys.label.total deposited',
			pathToViewDetail: 'deposit'
		},
		{
			promisedValue: totalPayoutPromise,
			label: 'sys.label.total payout',
			pathToViewDetail: 'payout'
		},
		{
			promisedValue: totalRequestPayoutPromise,
			label: 'sys.label.total request payout',
			pathToViewDetail: 'request-payout'
		}
	];

    const xValues = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
	const yValues = [5, 12, 7, 16];

	const chartData = {
		labels: xValues,
		datasets: [
			{
				fill: false,
				lineTension: 0,
				responsive: true,
				backgroundColor: 'rgba(250, 250, 250, 1)',
				borderColor: 'rgba(250, 250, 250, 1)',
				data: yValues,
				pointStyle: 'rectRot'
			}
		]
	};

	onMount(() => {
		formLoading$.next(false);
	});

	const viewDetail = (path) => {
		goto(`${path}`);
	};
</script>

<div class="summary">
	{#each summaryList as item}
		<div class="flex-wrap">
			<div class="three-dot-text link" on:click={() => viewDetail(item.pathToViewDetail)}>
				{$t(item.label)}: {@html App.SPACE_CODE}
			</div>
			<div class="link" on:click={() => viewDetail(item.pathToViewDetail)}>
				{#await item.promisedValue}
					{'...'}
				{:then value}
					{SNumber.toLocaleString(value.data)}
				{/await}
			</div>
		</div>
	{/each}
</div>

<div style="color: var(--base-color); margin-top: 12px;">
    <div class="center-text large-font-size capitalize">
        {$t('sys.label.weekly deposit')}
    </div>
    <div style="height: 100px;">
        <Line
            data={chartData}
            options={{
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)'
                        },
                        ticks: {
                            color: 'rgba(250, 250, 250, 1)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)'
                        },
                        ticks: {
                            color: 'rgba(250, 250, 250, 1)'
                        }
                    }
                },

                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />
    </div>
</div>


<style>
    .summary {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }
</style>
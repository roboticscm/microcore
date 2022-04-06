<script context="module">
	export const load = async ({ fetch, session, url }) => {
		const res = await fetch('/api/auth/need-login', {
			method: 'POST',
			body: JSON.stringify({
				pathname: url.pathname,
				session
			})
		});

		if (res.status > 400) {
			return (await res.json()).error
		}

		return {
			props: {}
		};
	};
</script>

<script>
	import { SDate } from '$lib/date';
	import { t } from '$lib/i18n';
	import { config } from '$src/config/config';
	import { LoginInfo } from '$src/store/login-info';
	import Card from '$components/ui/card/index.svelte';
	import { onMount } from 'svelte';
	import Line from 'svelte-chartjs/src/Line.svelte';
	import ProfileSummary from '$components/profile-summary/index.svelte';

	const totalNetwork = 1503000;
	const totalCommission = 15360;
	const totalPayout = 23676;
	const cashoutPending = 15360;

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

	onMount(() => {});

	const currencyFormat = (value) => {
		return value;
	};
</script>

<main>
	<ProfileSummary />

	<div class="row96" style="margin-top: 12px;">
		<div class="col96-xs-96 col96-md-47" style="color: white;">
			<div class="center-text large-font-size">
				{$t('sys.label.weekly profits')}
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
		<div style="margin-top: 12px;" class="horizontal-line col96-96">
			<hr style="border: 1px solid var(--border-color);" />
		</div>
		<div class="vertical-line col96-1" />
		<div class="col96-xs-96 col96-md-47">
			<div class="default-padding">
				{$t('sys.label.total network')}: ${currencyFormat(totalNetwork)}
			</div>
			<div class="default-padding">
				{$t('sys.label.total commission')}: ${currencyFormat(totalCommission)}
			</div>
			<div class="default-padding">
				{$t('sys.label.total payout')}: ${currencyFormat(totalPayout)}
			</div>
			<div class="default-padding">
				{$t('sys.label.cashout pending')}: ${currencyFormat(cashoutPending)}
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

	.horizontal-line {
		display: none;
	}
	@media screen and (max-width: 768px) {
		.vertical-line {
			display: none;
		}

		.horizontal-line {
			display: block;
		}
	}
</style>

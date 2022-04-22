<script>
	import { SDate } from '$lib/date';
	import { t } from '$lib/i18n';
	import { LoginInfo } from '$src/store/login-info';
	import { onMount } from 'svelte';
	import ProfileSummary from '$components/profile-summary/index.svelte';
	import Tabs from '$ui/tabs/index.svelte';
	import { SNumber } from '$src/lib/snumber';

	const { locale$ } = LoginInfo;

	let tabList = [];
	$: if ($locale$) {
		tabList = [
			{
				id: 'FLAT',
				title: $t('sys.label.flat')
			},
			{
				id: 'TREE',
				title: $t('sys.label.tree')
			}
		];
	}

	let activeTab;
	$: if (!activeTab && tabList && tabList.length > 0) {
		activeTab = tabList[0].id;
	}

	let loaded = false;
	const data = [
		{
			accountId: '2',
			registeredDate: 1000000000,
			username: 'user1',
			refLevel: 'Level 1',
			commission: 1000,
			refId: '1'
		},
		{
			accountId: '3',
			registeredDate: 1000000000,
			username: 'user2',
			refLevel: 'Level 2',
			commission: 1000,
			refId: '2'
		},
		{
			accountId: '31',
			registeredDate: 1000000000,
			username: 'user21',
			refLevel: 'Level 2',
			commission: 300,
			refId: '3'
		},
		{
			accountId: '4',
			registeredDate: 1000000000,
			username: 'user3',
			refLevel: 'Level 3',
			commission: 700,
			refId: '3'
		}
	];

	onMount(() => {
		loaded = true;
	});
</script>

<main>
	<ProfileSummary />

	<div class="row col-gap">
		<div class="col-xs-24 col-md-12 flex">
			<input class="date-w-100" placeholder={$t('sys.label.from date')} type="date" />-<input
				class="date-w-100"
				placeholder={$t('sys.label.to date')}
				type="date"
			/>
		</div>
		<div class="col-xs-24 col-md-12"><input placeholder={$t('sys.label.filter text')} type="search" /></div>
	</div>
	{#if loaded}
		<div style="padding: 6px;">
			<Tabs {tabList} bind:activeTab>
				{#if activeTab === 'FLAT'}
					<table style="margin-top: 6px;" border="1" class="table">
						<thead>
							<th> # </th>

							<th>
								{$t('sys.label.register date')}
							</th>

							<th>
								{$t('sys.label.username')}
							</th>

							<th>
								{$t('sys.label.ref levels')}
							</th>

							<th>
								{$t('sys.label.commission')}
							</th>
						</thead>
						<tbody>
							{#if data && Array.isArray(data) && data.length > 0}
								{#each data as row, index}
									<tr>
										<td class="center-text">{index + 1}</td>
										<td class="center-text">{SDate.convertMillisecondToDateString(row.registeredDate)}</td>
										<td>{row.username}</td>
										<td class="center-text">{row.refLevel}</td>
										<td class="right-text">${SNumber.toLocaleString(row.commission, 2)}</td>
									</tr>
								{/each}
							{:else}
								<tr>
									<td colspan="5" class="center-text">
										{$t('sys.msg.empty list')}
									</td>
								</tr>
							{/if}
						</tbody>
					</table>

					<div class="list vflex" style="margin-top: 6px;">
						{#if data && Array.isArray(data) && data.length > 0}
							{#each data as row, index}
								<div class="card" style="flex-direction: column;">
									<div>#: {index + 1}</div>
									<div>
										{$t('sys.label.register date')}: {SDate.convertMillisecondToDateString(
											row.registeredDate
										)}
									</div>
									<div>{$t('sys.label.username')}: {row.username}</div>
									<div>{$t('sys.label.ref levels')}: {row.refLevel}</div>
									<div>
										{$t('sys.label.commission')}: ${SNumber.toLocaleString(row.commission, 2)}
									</div>
								</div>
							{/each}
						{:else}
							{$t('sys.msg.empty list')}
						{/if}
					</div>
				{:else if activeTab === 'TREE'}
					Comming soon
				{/if}
			</Tabs>
		</div>
	{/if}
</main>

<style lang="scss">
	.col-gap {
		column-gap: 12px;
	}

	.date-w-100 {
		width: 100%;
	}

	.list {
		display: none;
	}
	@media screen and (max-width: 1024px) {
		.col-gap {
			column-gap: 0px;
		}

		.date-w-100 {
			width: 50%;
		}

		.table {
			display: none;
		}

		.list {
			display: flex;
		}
	}
</style>

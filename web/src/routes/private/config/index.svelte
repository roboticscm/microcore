<script context="module">
	import { fetchPost } from '$src/lib/http';
	export const load = async ({ fetch }) => {
		let appSetting = [];
		try {
			const res = await fetchPost(fetch, 'config/find', {
				menuId: null,
				branchId: null
			});
			appSetting = res?.body?.data;
		} catch (err) {}

		return {
			props: {
				appSetting
			}
		};
	};
</script>

<script>
	import { t } from '$lib/i18n';
	import { StringUtil } from '$src/lib/string-util';
	import { cloneObjct, getDiffRowIndex } from '$src/lib/object';
	import { Store } from './store';
	import Snackbar from '$components/ui/snackbar/index.svelte';
	import { error } from '$src/lib/log';
	import { AppStore } from '$src/store/app';

	export let appSetting;

	const saveItemRunnings = [];
	let saveAllRunning = false;

	let originAppSetting = cloneObjct(appSetting);
	const store = new Store();
	let snackbarRef;

	$: changedRowIndex = getDiffRowIndex(originAppSetting, appSetting);
	$: showToolbelt = (changedRowIndex || []).length > 1;

	store
		.init()
		.then((res) => {})
		.catch((err) => {})
		.finally(() => AppStore.formLoading$.next(false));

	const doDiscardItem = (index) => {
		appSetting[index] = cloneObjct(originAppSetting[index]);
	};

	const doDiscardAll = () => {
		appSetting = cloneObjct(originAppSetting);
	};

	const doSaveAll = () => {
		const newData = changedRowIndex.map((idx) => {
			return {
				...appSetting[idx],
				value: `${appSetting[idx].value}`
			};
		});

		saveAllRunning = true;
		store
			.update(newData)
			.then(() => {
				originAppSetting = cloneObjct(appSetting);
				snackbarRef.showSaveSuccess();
			})
			.catch((err) => {
				if (err.unknownError) {
					snackbarRef.showUnknownError(
						typeof err === 'string' ? $t(err) : $t(err.unknownError) + ' ' + $t(err.errorDetail)
					);
				} else {
				}
			})
			.finally(() => {
				saveAllRunning = false;
			});
	};

	const doSaveItem = (index) => {
		saveItemRunnings[index] = true;
		store
			.update([{ ...appSetting[index], value: `${appSetting[index].value}` }])
			.then(() => {
				originAppSetting[index] = cloneObjct(appSetting[index]);
				snackbarRef.showSaveSuccess();
			})
			.catch((err) => {
				if (err.unknownError) {
					snackbarRef.showUnknownError(
						typeof err === 'string' ? $t(err) : $t(err.unknownError) + ' ' + $t(err.errorDetail)
					);
				} else {
				}
			})
			.finally(() => {
				saveItemRunnings[index] = false;
			});
	};
</script>

<Snackbar bind:this={snackbarRef} />

{#if appSetting && Array.isArray(appSetting) && appSetting.length}
	<table>
		<thead>
			<tr>
				<th style="width: 30px;"> # </th>
				<th>
					{$t('sys.label.parameter')}
				</th>
				<th>
					{$t('sys.label.value')}
				</th>
				<th style="width: 80px;">
					{$t('sys.label.order')}
				</th>

				<th style="width: 150px;">
					{$t('sys.label.action')}
				</th>
			</tr>
		</thead>
		<tbody>
			{#each appSetting as row, index}
				<tr>
					<td  data-label="#" class="center-text">{index + 1}</td>
					<td data-label="{$t('sys.label.parameter')}" title={$t(`sys.label.${row.description}`)} class="three-dot-text">
						{$t(`sys.label.${row.description}`)}
					</td>
					<td data-label={$t('sys.label.value')}>
						{#if row.valueDataType === 'boolean'}
							<input
								title={row.value}
								style="border: none;"
								type="checkbox"
								bind:checked={row.value}
							/>
						{:else if row.valueDataType === 'number'}
							<input
								max={row.max}
								min={row.min}
								title={row.value}
								class="three-dot-text"
								style="border: none;"
								type="number"
								bind:value={row.value}
							/>
						{:else}
							<input
								title={row.value}
								class="three-dot-text"
								style="border: none;"
								type="text"
								bind:value={row.value}
							/>
						{/if}
					</td>
					<td data-label={$t('sys.label.order')}>
						<input class="right-text" style="border: none;" type="number" bind:value={row.sort} />
					</td>

					<td data-label={$t('sys.label.action')}>
						{#if JSON.stringify(originAppSetting[index]) !== JSON.stringify(appSetting[index])}
							<button
								type="button"
								disabled={saveItemRunnings[index]}
								on:click={() => doSaveItem(index)}>{$t('sys.button.save')}</button
							>
							<button on:click={() => doDiscardItem(index)}>{$t('sys.button.discard')}</button>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

{#if showToolbelt}
	<div class="main__body__center__right-bottom-floating">
		<button disabled={saveAllRunning} on:click={doSaveAll}>{$t('sys.button.save all')}</button>
		<button on:click={doDiscardAll}>{$t('sys.button.discard all')}</button>
	</div>
{/if}

<style>
	table {
		border: 1px solid #ccc;
		border-collapse: collapse;
		margin: 0;
		padding: 0;
		width: 100%;
		table-layout: fixed;
	}

	table tr {
		border: 1px solid #ddd;
		padding: 0.35em;
	}

	table th,
	table td {
		padding: 0.625em;
	}

	table th {
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	@media screen and (max-width: 600px) {
		table {
			border: 0;
		}

		table thead {
			border: none;
			clip: rect(0 0 0 0);
			height: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
			width: 1px;
		}

		table tr {
			/* border-bottom: 3px solid #ddd; */
			display: block;
			margin-bottom: 0.625em;
		}

		table td {
			/* border-bottom: 1px solid #ddd; */
			display: block;
			text-align: right;
		}

		table td::before {
			content: attr(data-label);
			float: left;
			text-transform: uppercase;
		}

		table td:last-child {
			border-bottom: 0;
		}
	}
</style>

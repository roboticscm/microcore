<script>
	import { onMount } from 'svelte';
	import { SettingService } from '$src/services/setting';
	import { createEventDispatcher } from 'svelte';
	import { error } from '$src/lib/log';

	export let tabList = []; // [{id, title}, {}]
	export let activeTab = undefined;
	export let tabPosition = 'TOP_HORIZONTAL'; //LEFT_VERTICAL, BOTTOM_HORIZONTAL, RIGHT_VERTICAL
	export let saveState = false;
	export let saveKey = undefined;
	export let autoLoadState = false;

	const dispatch = createEventDispatcher();
	$: className = ((tabPosition) => {
		switch (tabPosition) {
			case 'TOP_HORIZONTAL':
				return 'tabs-header__top-horizontal';
			case 'BOTTOM_HORIZONTAL':
				return 'tabs-header__bottom-horizontal';
			case 'LEFT_VERTICAL':
				return 'tabs-header__left-vertical';
			case 'RIGHT_VERTICAL':
				return 'tabs-header__right-vertical';
		}
	})(tabPosition);

	const selectTab = (id) => {
		dispatch('select', id);
		activeTab = id;
		if (saveState) {
			if (saveKey) {
				SettingService.saveUserSetting([saveKey], [`${id}`]);
			} else {
				error('Props saveKey is required');
			}
		}
	};

	onMount(() => {
		if (tabList.length > 0) {
			if (saveState && autoLoadState) {
				SettingService.findUserSetting().then((res) => {
					if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
						activeTab = res.data.find((it) => it.key === saveKey)?.value;
					}
				});
			}

			if (!activeTab) {
				activeTab = tabList[0].id;
			}
		}
	});
</script>

<div class="tabs-container">
	<div class="tabs-header">
		<div class={className}>
			{#if tabList.length > 0}
				{#each tabList as tab}
					<div
						on:click={() => selectTab(tab.id)}
						class="{className + '__item'} {activeTab == tab.id ? 'tab-active' : ''}"
					>
						<div class="tab-title">
							{@html tab.title}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div class="tabs-content">
		<slot />
	</div>
</div>

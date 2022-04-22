<script>
	import { onMount } from 'svelte';
	import { StringUtil } from '$lib/string-util';
	import { ButtonType } from './types';
	import { Browser } from '$lib/browser';
	import { debounceTime } from '$lib/rx';
	import { App } from '$lib/constants';
	import { t } from '$lib/i18n';

	export let view = undefined;
	export let text = '';
	export let title = '';
	export let btnType = ButtonType.custom;
	export let icon = '';
	export let className = 'btn-flat';
	export let addClassName = '';
	export let iconClassName = '';
	export let disabled = false;
	export let running = false;
	export let action = undefined;
	export let showIcon = true;
	export let showText = true;
	export let showIconOnly = false;
	export let uppercase = true;
	export let isOn = false;
	export let alwaysShowBothIconAndText = true;
	export let style = '';
	export let isDense = false;
	export let rendered = true;
	export let type = 'submit';
	export let enterAsClick = true;
	export let innerComponent = false;
	export let forceClass = undefined;
	export let IconComponent = undefined;

	$: BUTTON_MIN_WITH = isDense ? 30 : 90;

	$: isRendered = !view
		? rendered
		: view.isRendered(btnType.startsWith('#') ? btnType.substring(1) : btnType, rendered);
	$: isDisabled = !view
		? disabled
		: view.isDisabled(btnType.startsWith('#') ? btnType.substring(1) : btnType, disabled);

	$: _className = className;

	let btnRef;
	export const getTarget = () => {
		return btnRef;
	};

	const preset = (_title, _icon, __className) => {
		if (StringUtil.isEmpty(text) && !StringUtil.isEmpty(_title)) {
			text = `sys.button.${_title}`;
		}
		if (StringUtil.isEmpty(icon) && !StringUtil.isEmpty(_icon)) {
			icon = _icon;
		}

		if (StringUtil.isEmpty(__className) && !StringUtil.isEmpty(_className)) {
			_className = __className;
		}
	};

	$: {
		switch (btnType) {
			case ButtonType.reset:
				preset('reset', '<i class="fa fa-redo-alt"></i>', 'btn-flat');
				break;
			case ButtonType.addNew:
				preset('addNew', 'add-new18x18', 'btn-flat');
				break;
			case ButtonType.import:
				preset('import', '<i class="fas fa-file-import"></i>', 'btn-flat');
				break;

			case ButtonType.save:
				preset('save', 'save18x18', 'btn-flat');
				break;
			case ButtonType.delete:
				preset('delete', 'delete18x18', 'btn-flat');
				break;
			case ButtonType.edit:
				preset('edit', 'edit18x18', 'btn-flat');
				break;
			case ButtonType.update:
				preset('update', 'update24x24', 'btn-flat');
				break;
			case ButtonType.config:
				preset('config', 'config24x24', 'btn-flat');
				break;
			case ButtonType.viewLog:
				preset('viewLog', '<i class="fas fa-book-medical"></i>', 'btn-flat');
				break;
			case ButtonType.trashRestore:
				preset('trashRestore', 'trash-restore', 'btn-flat');
				break;
			case ButtonType.closeModal:
				preset(undefined, '<i class="fa fa-times"></i>', 'btn-flat');
				break;
			case ButtonType.okModal:
				preset('ok', '<i style="color:#20b04b;" class="fa fa-check"></i>', 'btn-success');
				break;
			case ButtonType.cancelModal:
				preset('cancel', '<i style="color:red;" class="fa fa-times"></i>', 'btn-danger');
				break;
			case ButtonType.apply:
				preset('apply', '<i class="fa fa-check"></i>', 'btn-flat');
				break;
			case ButtonType.selectAll:
				preset(undefined, '<i class="fa fa-check-double"></i>', 'btn-flat');
				isDense = true;
				break;
			case ButtonType.unSelectAll:
				preset(undefined, '<i class="fa fa-minus-square"></i>', 'btn-flat');
				isDense = true;
				break;
			case ButtonType.toggleSelection:
				preset(undefined, '<i class="fa fa-toggle-on"></i>', 'btn-flat');
				isDense = true;
				break;
			case ButtonType.submit:
				preset('submit', 'submit18x18', 'btn-flat');
				break;
			case ButtonType.unSubmit:
				preset('unSubmit', 'un-submit18x18', 'btn-flat');
				break;
			case ButtonType.recallRequest:
				preset('recallRequest', 'recall-request18x18', 'btn-flat');
				break;
			case ButtonType.approve:
				preset('approve', 'approve18x18', 'btn-flat');
				break;
			case ButtonType.unApprove:
				preset('unApprove', 'un-approve18x18', 'btn-flat');
				break;
			case ButtonType.deny:
				preset('deny', 'deny18x18', 'btn-flat');
				break;
			case ButtonType.assign:
				preset('assign', 'assign24x24', 'btn-flat');
				break;
			case ButtonType.unAssign:
				preset('unAssign', 'un-assign24x24', 'btn-flat');
				break;

			case ButtonType.hold:
				preset('hold', 'hold18x18', 'btn-flat');
				break;
			case ButtonType.unHold:
				preset('unHolad', 'un-hold18x18', 'btn-flat');
				break;

			case ButtonType.requestRedo:
				preset('requestRedo', 'request-redo18x18', 'btn-flat');
				break;

			case ButtonType.cancel:
				preset('cancelResult', 'cancel18x18', 'btn-flat');
				break;

			case ButtonType.dashboard:
				preset('dashboard', 'dashboard24x24', 'btn-flat');
				break;

			case ButtonType.complete:
				preset('complete', 'complete', 'btn-flat');
				break;

			case ButtonType.unComplete:
				preset('unComplete', 'un-complete', 'btn-flat');
				break;

			case ButtonType.back:
				preset('back', '<i class="fa fa-arrow-left"></i>', 'btn-flat');
				break;

			case ButtonType.next:
				preset('next', '<i class="fa fa-arrow-right"></i>', 'btn-flat');
				break;

			case ButtonType.copy:
				preset('copy', 'clone18x18', 'btn-flat');
				break;

			case ButtonType.import:
				preset('import', '<i class="fas fa-file-import"></i>', 'btn-flat');
				break;

			case ButtonType.register:
				preset('register', undefined, 'btn-flat');
				break;

			case ButtonType.print:
				preset('print', 'print18x18', 'btn-flat');
				break;
			case ButtonType.exportPdf:
				preset('exportPdf', 'export-pdf18x18', 'btn-flat');
				break;
			case ButtonType.exportExcel:
				preset('exportExcel', 'export-excel18x18', 'btn-flat');
				break;
			case ButtonType.export:
				preset('export', '<i class="fas fa-file-export"></i>', 'btn-flat');
				break;

			case ButtonType.search:
				preset('search', '<i class="fas fa-search"></i>', 'btn-flat');
				break;

			case ButtonType.preview:
				preset('preview', '<i class="fas fa-search"></i>', 'btn-flat');
				break;

			case ButtonType.htmlPreview:
				preset('htmlPreview', '<i class="fab fa-html5"></i>', 'btn-flat');
				break;

			case ButtonType.pdfPreview:
				preset('pdfPreview', '<i class="far fa-file-pdf"></i>', 'btn-flat');
				break;

			case ButtonType.follow:
				preset('follow', 'follow18x18', 'btn-flat');
				break;
			case ButtonType.unFollow:
				preset('unFollow', 'un-follow18x18', 'btn-flat');
				break;

			case ButtonType.mark:
				preset('mark', 'mark18x18', 'btn-flat');
				break;
			case ButtonType.unMark:
				preset('unMark', 'un-mark18x18', 'btn-flat');
				break;

			case ButtonType.report:
				preset('badReport', 'bad-report18x18', 'btn-flat');
				break;
			case ButtonType.unReport:
				preset('unReport', 'un-report18x18', 'btn-flat');
				break;

			case ButtonType.more:
				preset(undefined, '<i class="fas fa-ellipsis-v"></i>', 'btn-flat');
				break;
			case ButtonType.pdfTest:
				preset('pdfTest', 'export-pdf18x18', 'btn-flat');
				break;
			case ButtonType.pdfTestFromFile:
				preset('PdfTestFromFile', 'export-pdf18x18', 'btn-flat');
				break;
			case ButtonType.nextStep:
				preset('nextStep', '<i class="far fa-arrow-alt-circle-right">', 'btn-flat');
				break;
			case ButtonType.login:
				preset('login', '<i class="fas fa-unlock-alt">', 'btn-flat');
				break;
			default:
		}

		// if (icon && !icon.includes('<')) {
		//   import(/* @vite-ignore */ `/src/icons/${icon}.svelte`).then((res) => {
		//     IconComponent = res.default;
		//   });
		// }
	}

	const useAction = (component, param) => {
		if (action) {
			action.register(component, param);
		}
	};

	const showTextOrHide = (containerWidth, childrenCount) => {
		if (btnRef && childrenCount > 0 && containerWidth / childrenCount >= BUTTON_MIN_WITH) {
			showText = true;

			if (!btnRef.style.getPropertyPriority('min-width')) {
				btnRef.style.minWidth = `${BUTTON_MIN_WITH}px`;
			}
		} else if (btnRef) {
			showText = false;
			btnRef.style.minWidth = '50px';
		}
	};

	const onResizeContainer = (e) => {
		if (showIconOnly || alwaysShowBothIconAndText) {
			return;
		}

		const container = e[0].target;
		const containerWidth = window['$'](container).width();
		const childrenCount = container.childElementCount;

		showTextOrHide(containerWidth, childrenCount);
	};

	onMount(() => {
		if (!showIconOnly) {
			if (btnRef) {
				if (!btnRef.style.getPropertyPriority('min-width')) {
					btnRef.style.minWidth = `${BUTTON_MIN_WITH}px`;
				}
			}
		}

		let resizeObserver;

		if (Browser.getBrowser() !== 'Safari') {
			resizeObserver = new ResizeObserver(debounceTime(100, onResizeContainer));
			if (btnRef) {
				resizeObserver && resizeObserver.observe(btnRef.parentElement);
			}
		}

		return () => {
			if (btnRef) {
				resizeObserver && resizeObserver.unobserve(btnRef.parentElement);
			}
		};
	});
</script>

{#if isRendered}
	<button
		on:keyup={(e) => enterAsClick && e.code === 'Enter' && btnRef.click()}
		{type}
		title={title ? title : text}
		use:useAction
		bind:this={btnRef}
		id={btnType.startsWith('#') ? btnType.substring(1) : undefined}
		style={`${
			forceClass
				? ''
				: isDense
				? 'margin-left: 1px; margin-right: 1px; align-items: center; justify-content: center; padding-left: 0px; '
				: ''
		}  ${style}`}
		class="{forceClass ? forceClass : isDense ? _className + ' btn-dense' : _className}
    {uppercase ? 'uppercase' : ''}
    {isDisabled ? 'text-disabled' : ''}
    {isOn ? 'iot-on-button' : ''}
    {addClassName}
    "
		disabled={isDisabled || running}
		on:click
	>
		{#if innerComponent}
			{#if running}
				<i class="fa fa-spinner fa-spin" />
			{:else if showIcon}
				{#if icon && icon.includes('<')}
					<span style="width: 16px;">
						{@html icon}
					</span>
				{:else}
					<svelte:component
						this={IconComponent}
						className="{disabled ? 'svg-disabled' : ''} {iconClassName}"
					/>
				{/if}
			{/if}

			{#if showText && text}
				<span class="center-middle">
					{#if icon}
						<span style="width: 8px;" />
					{/if}
					{@html (text || '').countSubString('.') > 1 ? $t(text) : text}
				</span>
			{/if}
		{:else}
			<div style="display: flex; justify-content: center; overflow: hidden;">
				{#if running}
					<i class="fa fa-spinner fa-spin" />
					{@html App.SPACE_CODE + App.SPACE_CODE}
				{:else if showIcon}
					{#if icon && icon.includes('<')}
						<div style="height: 16px; width: 16px;">
							{@html icon}
						</div>
					{:else}
						<svelte:component
							this={IconComponent}
							className="{disabled ? 'svg-disabled' : ''} {iconClassName}"
						/>
						<slot name="icon" />
					{/if}
				{/if}

				{#if showIcon && showText}
					{@html App.SPACE_CODE + App.SPACE_CODE}
				{/if}

				{#if showText}
					<div class="three-dot-text">{@html (text || '').countSubString('.') > 1 ? $t(text) : text}</div>
				{/if}
			</div>
		{/if}
	</button>
{/if}

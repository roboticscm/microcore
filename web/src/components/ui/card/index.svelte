<script>
	export let title;
	export let value;
	export let valueFormatterCallback;

	export let bodyAlign = 'center';

	$: formatValue =  valueFormatterCallback ? valueFormatterCallback(value) : value
</script>

<div class="card">
	<div class="card__avatar">
		<slot name="avatar" />
	</div>

	<div class="card__content">
		<div {title} class="card__content__header">{@html title}</div>
		<div title={formatValue} class={bodyAlign === 'center' ? 'card__content__center-body' : 'card__content__left-body'}>
			{@html formatValue}
		</div>
	</div>
</div>

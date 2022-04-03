<script>
    export let title;
    export let value;
    export let valueFormatterCallback;

    export let bodyAlign = "center";
</script>

<div class="card">
    <div class="card__header">{@html title}</div>
    <div class="{bodyAlign === 'center' ? 'card__center-body': 'left-body'}">{@html valueFormatterCallback ? valueFormatterCallback(value) : value }</div>
</div>
<script>
  import { t } from '$lib/i18n';

  export let form = undefined;
  export let errorMessage = undefined;
  export let field = undefined;
  export let className = 'error-text';
  export let style = undefined;

  $: errorText = (form || {errors: {}}).errors.get(field);
</script>

{#if form && form.errors.has(field)}
  <span class={className} name={field} {style}>{errorText.countSubString('.') > 0 ? $t(errorText) : errorText}</span>
{/if}
{#if errorMessage}
  <span class={className} name={field} {style}>{errorMessage}</span>
{/if}

<script>
  import { AppStore } from '$src/store/app';

  export let smallSize = false;

  const { formLoading$ } = AppStore;
</script>

{#if $formLoading$}
  <div class="progress-bar-wrapper">
    <i class="progress-bar {smallSize ? 'small-progress-bar' : ''} fa fa-spinner fa-spin" />
  </div>
{/if}

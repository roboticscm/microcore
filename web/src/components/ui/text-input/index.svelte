<script>
    import { App } from '$lib/constants';
    import { createEventDispatcher } from 'svelte';
  
    export let value = undefined;
    export let name = undefined;
    export let disabled = false;
    export let className = '';
    export let autocomplete = App.AUTO_COMPLETE;
    export let placeholder = undefined;
    export let label = undefined;
    export let checked = undefined;
    export let rightCheck = false;
    export let title = '';
    export let checkTitle = '';
    export let readonly = false;
    export let suffixIcon = '<i class="fas fa-percent"></i>';
    export let showSuffixIcon = false;
    export let editableLabel = false;
    export let type = 'search';
    export let style='';
    export let required = false;
  
    /** @type { string | number }*/
    export let tabindex = undefined;
  
    $: if(label) {
      label = label + (required ? '(*)' : '')
    }
    const dispatch = createEventDispatcher();
  
    let inputRef, labelRef;
    export const focus = () => {
      if (inputRef) {
        inputRef.focus();
      }
    };
  
    const onCheck = () => {
      inputRef && inputRef.focus();
    };
  
    const onFocus = (e) => {
      inputRef.placeholder = placeholder || '';
      if(e.target.type === 'password') {
        setTimeout(() => {
          inputRef.removeAttribute('readonly');
        }, 100)
      }
      dispatch('focus', e);
    };
  
    const onBlur = (e) => {
      inputRef.placeholder = label || placeholder || '';
      if(e.target.type === 'password') {
        inputRef.setAttribute('readonly', true);
      }
      dispatch('blur', e);
    };
  
    const onKeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };
  
    const onKeyup = (e) => {
      if ((labelRef.innerText || '').length === 0) {
        label = '';
        labelRef.innerText = 'No label';
      }
    };
  
    const onInput = (e) => {
      label = labelRef.innerText;
    };
  </script>
  
  <div class="floating-wrapper">
    {#if type==="password"}
      <input
        {tabindex}
        {style}
        title={title ? title : value}
        on:focus={onFocus}
        on:keydown
        on:blur={onBlur}
        on:keyup
        {name}
        type="password"
        readonly
        {disabled}
        class="{checked !== undefined ? 'check' : ''}
        {rightCheck ? 'right' : ''} floating__input {className}"
        bind:value
        {autocomplete}
        spellcheck={false}
        autocapitalize="none"
        autocorrect="off"
        placeholder={label || placeholder || ''}
        bind:this={inputRef}
        required />
    {:else}
      <input
        {style}
        {tabindex}
        title={title ? title : value}
        on:focus={onFocus}
        on:keydown
        on:blur={onBlur}
        on:keyup
        {name}
        type="search"
        {readonly}
        {disabled}
        class="{checked !== undefined ? 'check' : ''}
        {rightCheck ? 'right' : ''} floating__input {className}"
        bind:value
        {autocomplete}
        spellcheck={false}
        autocapitalize="none"
        autocorrect="off"
        placeholder={label || placeholder || ''}
        bind:this={inputRef}
        required />
    {/if}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      bind:this={labelRef}
      on:keydown={onKeydown}
      on:input={onInput}
      on:keyup={onKeyup}
      spellcheck={false}
      class="floating__label"
      contenteditable={editableLabel}>
      {(label || '')}
    </label>
    {#if showSuffixIcon}
      <div class="floating__suffix-icon">
        {@html suffixIcon}
      </div>
    {/if}
    {#if checked !== undefined}
      <input
        title={checkTitle}
        class={rightCheck ? 'right' : ''}
        tabindex="-1"
        {disabled}
        bind:checked
        type="checkbox"
        on:change={onCheck} />
    {/if}
  </div>
  
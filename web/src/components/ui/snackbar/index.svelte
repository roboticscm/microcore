<script>
  import { StringUtil } from '$lib/string-util';
  import { t } from '$lib/i18n';
  import { App } from '$lib/constants';
  import { dev } from '$app/env';

  let snackbarRef;
  let msg;

  export const show = (_msg, timeout = App.SNACKBAR_TIMEOUT) => {
    msg =  _msg;
    snackbarRef.classList.add('show-snackbar');
    setTimeout(() => {
      snackbarRef && snackbarRef.classList.remove('show-snackbar');
    }, timeout);
  };

  export const showSaveSuccess = (extraMsg = '') => {
    show($t('sys.msg.save success') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showLoginSuccess = (extraMsg = '') => {
    show($t('sys.msg.login success') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showCopySuccess = (extraMsg = '') => {
    show($t('sys.msg.copy success') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showDeleteSuccess = (extraMsg = '') => {
    show($t('sys.msg.delete success') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showUpdateSuccess = (extraMsg = '') => {
    show($t('sys.msg.update success') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showChangePasswordSuccessful = () => {
    show($t('sys.msg.change password successfull') );
  }
  export const showUnknownError = (extraMsg = '') => {
    if (dev) {
      show($t('sys.msg.unknown error') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
    } else {
      show($t('sys.msg.unknown error'));
    }
    
  };

  export const showTrashEmpty = (extraMsg = '') => {
    show($t('sys.msg.trash empty') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showTrashRestoreSuccess = (extraMsg = '') => {
    show($t('sys.msg.trash restore success') + (StringUtil.isEmpty(extraMsg) ? '' : '. ' + extraMsg));
  };

  export const showNoDataChange = () => {
    show($t('sys.msg.no data change'));
  };

  export const showDuplicateData = () => {
    show($t('sys.msg.duplicate data'));
  };

  export const noData = () => {
    show($t('sys.msg.no data update'));
  };

  export const chooseOneCategory = () => {
    show($t('sys.msg.choose one category'));
  };

  export const showNoDataSearchingFound = () => {
    show($t('sys.msg.no data searching found'));
  };

  export const showMissingId = () => {
    show($t('sys.msg.your data seem to be misssing ID'));
  }

</script>

<div on:click={() => snackbarRef.classList.remove('show-snackbar')} class="snackbar" bind:this={snackbarRef}>{msg}</div>

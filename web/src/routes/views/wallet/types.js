import { GenericType } from '$lib/types'

export class FormBody extends GenericType {
    constructor(...args) {
        super(...args);
        this.depositAmount = undefined;
        this.emailCode = '';
        this.googleTotp = '';
    }
}

export class WithdrawFormBody extends GenericType {
    constructor(...args) {
        super(...args);
        this.amount = undefined;
        this.withdrawWalletAddress = 'THSzPB84GShkCx9vkKxcPaRtAQr59KEX3Y';
        this.emailCode = '';
        this.googleTotp = '';
    }
}
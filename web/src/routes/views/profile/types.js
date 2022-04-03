import { GenericType } from '$lib/types'

export class Partner extends GenericType {
    constructor(...args) {
        super(...args);
        this.firstName = '';
        this.lastName = '';
        this.birthday = undefined;
        this.nationality = '';
        this.email='';
        this.trc20Address='THSzPB84GShkCx9vkKxcPaRtAQr59KEX3Y';
    }
}
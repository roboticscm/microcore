import { GenericType } from '$lib/types'

export class Partner extends GenericType {
    constructor(...args) {
        super(...args);
        this.username = '';
        this.password = '';
        this.confirmPassword='';
        this.referralId = '';
        this.email = '';
    }
}
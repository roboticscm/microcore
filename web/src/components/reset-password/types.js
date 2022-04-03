import { GenericType } from '$lib/types'

export class Partner extends GenericType {
    constructor(...args) {
        super(...args);
        this.password = '';
        this.confirmPassword = '';
        this.session='';
    }
}
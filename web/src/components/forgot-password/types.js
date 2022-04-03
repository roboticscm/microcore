import { GenericType } from '$lib/types'

export class Partner extends GenericType {
    constructor(...args) {
        super(...args);
        this.email = '';
    }
}
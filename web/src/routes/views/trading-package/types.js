import { GenericType } from '$lib/types'
export class TradingPackageFormBody extends GenericType {
    constructor(...args) {
        super(...args);
        this.amount = undefined;
    }
}
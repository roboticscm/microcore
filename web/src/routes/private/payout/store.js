import { AdminPayoutService } from "./service"

export class Store {
    getTotalRevenueShared = () => {
        return AdminPayoutService.getTotalRevenueShared();
    }
}
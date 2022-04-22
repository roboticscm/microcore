import { AdminDashboardService } from "./service"

export class Store {
    getTotalActivedMembers = () => {
        return AdminDashboardService.getTotalActivedMembers()
    }

    getTotalDeposited = () => {
        return AdminDashboardService.getTotalDeposited()
    }

    getTotalPayout = () => {
        return AdminDashboardService.getTotalPayout()
    }

    getTotalRequestPayout = () => {
        return AdminDashboardService.getTotalRequestPayout()
    }
}
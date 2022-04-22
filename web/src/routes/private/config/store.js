import { ConfigService } from "./service"

export class Store {
    init = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            }, 0)
        })
    }

    update = (body) => {
        return ConfigService.update(body)
    }
}
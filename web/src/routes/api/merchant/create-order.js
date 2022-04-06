import { buildBinanceHeader } from "$lib/merchant"

export const post = ({request}) => {
    return {
        body: buildBinanceHeader('abc')
    }
}
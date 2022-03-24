import { SNumber } from './snumber'

export const readNumber = (number) => {
    return SNumber.readNumber(number)
}

export const integerFormat = (number) => {
    return SNumber.toLocaleString(number, 0);
}

export const decimalFormat = (number, decimal = 2) => {
    return SNumber.toLocaleString(number, decimal)
}

export const autoFormat = (number, decimal = 2) => {
    return SNumber.autoFormat(number, decimal)
}
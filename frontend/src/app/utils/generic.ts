export const valueOr = (value: any, ifNull: any = '') => {
    return value ? value : ifNull;
};
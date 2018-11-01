export function valuesFromObject(obj: {}): any[] {
    return Object.keys(obj).map(k => obj[k])
}

export function minNotNull(value1: any, value2: any): any {
    return Math.min.apply(null, [value1, value2].filter(valueExist));
}

export function maxNotNull(value1: any, value2: any): any {
    return Math.max.apply(null, [value1, value2].filter(valueExist));
}

export function valueExist(value: any) {
    return value !== '' && value !== undefined && value !== null;
}

export function removeDuplicates(arr: any[]) {
    return Array.from(new Set(arr));
}

export function getId(value: any) {
    return value.id;
}
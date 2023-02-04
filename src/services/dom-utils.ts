import { FILTERS } from "../data/constants";

function checkIfFilterList(targetText: string, targetNode: string) {
    const filters: string[] = ['product', 'price', 'color', 'size'];
    return filters.includes(targetText) && targetNode === "p";
}

function checkProductType(type: string) {
    const types: string[] = FILTERS[0].listItems;
    return types.includes(type);
}

function checkPriceType(type: string) {
    const types: string[] = FILTERS[1].listItems;
    return types.includes(type);
}

function checkColorType(type: string) {
    const types: string[] = FILTERS[2].listItems;
    return types.includes(type);
}

function checkSizeType(type: string) {
    const types: string[] = FILTERS[3].listItems;
    return types.includes(type);
}

export { checkIfFilterList, checkProductType, checkPriceType, checkColorType, checkSizeType }
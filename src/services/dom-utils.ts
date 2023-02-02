function checkIfFilterList(targetText: string) {
    const FILTERS: string[] = ['product', 'price', 'color', 'size'];
    return FILTERS.includes(targetText);
}

export { checkIfFilterList }
interface ListObject {
    id: number,
    listHeading: string,
    listItems: string[]
}

type FilterList = ListObject[];

let counter = 0;

const FILTERS: FilterList = [
    {
        id: ++counter,
        listHeading: "product type",
        listItems: ["all", "tops", "bottoms",]
    },
    {
        id: ++counter,
        listHeading: "price",
        listItems: ["lowest to highest", "highest to lowest"]
    },
    {
        id: ++counter,
        listHeading: "color",
        listItems: ["clear", "white", "black", "navy", "grey"]
    },
    {
        id: ++counter,
        listHeading: "size",
        listItems: ['clear', 'xs', "s", "m", "l", 'xl']
    }
];

export { FILTERS }
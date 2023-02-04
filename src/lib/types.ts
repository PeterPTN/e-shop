interface ProductItems {
    color: string
    img: string
    item: string
    price: number
    id: string;
    sizes: {
        xs: number
        s: number
        m: number
        l: number
        xl: number
    }
}

type ProductsArray = ProductItems[];

interface Children {
    children: React.ReactNode,
}

export type { ProductItems, ProductsArray, Children }
interface ProductItems {
    color: string
    img: string
    item: string
    price: number
    id: string
    sizes: {
        xs: number
        s: number
        m: number
        l: number
        xl: number
    }
    inCart: {
        xs: number
        s: number
        m: number
        l: number
        xl: number
    }
    type: string
    favourite: boolean
    chosenSize: string
}

type ProductsArray = ProductItems[];

interface Children {
    children: React.ReactNode,
}

interface Sizes {
    xs: number
    s: number
    m: number
    l: number
    xl: number
}

export type { ProductItems, ProductsArray, Children, Sizes }
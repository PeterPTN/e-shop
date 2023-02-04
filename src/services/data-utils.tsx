import type { ProductItems } from "../lib/types";

// Recursive thing that nests providers
const BuildProviderTree = (providers: any): any => {
    if (providers.length === 1) {
        return providers[0];
    }

    // Recursive thing nests providers
    const A = providers.shift();
    const B = providers.shift();
    return BuildProviderTree([
        ({ children }: any) => (
            <A>
                <B>
                    {children}
                </B>
            </A>
        ),
        ...providers,
    ]);
};

const determineAvailability = (product: ProductItems) => {
    let array: string[] = [];
    Object.entries(product.sizes).forEach(([key, value]) => {
        if (value > 0) array.push(key);
    })
    return array.join(" ").toUpperCase();
}


export { BuildProviderTree, determineAvailability }
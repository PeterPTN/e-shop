import { useState, useEffect } from 'react';
import { checkIfFilterList } from '../../services/dom-utils';
import styles from './ProductFilter.module.scss';

interface ListType {
    [key: string]: boolean
}

const initialState = {
    product: false,
    price: false,
    color: false,
    size: false,
}

const ProductFilter = () => {
    const [showList, setShowList] = useState<ListType>(initialState);

    const handleListClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        const filterType = target.innerText.split(" ")[0].toLowerCase();
        const objListKeys = Object.keys(showList);

        if (objListKeys.includes(filterType)) {
            setShowList((current) => ({ ...initialState, [filterType]: !current[filterType] }))
        }
    }

    const handleFilterClick = () => {

    }

    useEffect(() => {
        window.scrollTo({ top: 0 })

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLInputElement;
            const targetText = target.innerText.split(" ")[0].toLowerCase();

            if (checkIfFilterList(targetText)) return;
            else setShowList({ ...initialState });
        }

        if (showList) document.addEventListener("click", handleClick)

        return () => document.removeEventListener("click", handleClick);
    }, [showList])

    // Convert to component - FilterTypeList -> FilterItems
    // Pass listItems as props
    // Capitalize using CSS

    const FILTERS = {
        product: {
            listHeading: "product type",
            listItems: ["tops", "bottoms"]
        },
        price: {
            listHeading: "price",
            listItems: ["lowest to highest", "highest to lowest"]
        },
        color: {
            listHeading: "color",
            listItems: ["red", "blue", "green"]
        },
        size: {
            listHeading: "size",
            listItems: ['XS', "S", "M", "L", 'XL']
        }
    }

    return (
        <ul className={styles.Filters}>
            <li className={styles.FilterType} onClick={handleListClick} >
                <p>Product Type</p>
                <ul className={showList.product ? styles.FilterListShow : styles.FilterListHide}>
                    <li>Tops</li>
                    <li>Bottoms</li>
                </ul>
            </li>

            <li className={styles.FilterType} onClick={handleListClick}>
                <p>Price</p>
                <ul className={showList.price ? styles.FilterListShow : styles.FilterListHide}>
                    <li>Lowest to highest</li>
                    <li>Highest to lowest</li>
                </ul>
            </li>

            <li className={styles.FilterType} onClick={handleListClick}>
                <p>Color</p>
                <ul className={showList.color ? styles.FilterListShow : styles.FilterListHide}>
                    <li>Red</li>
                    <li>Blue</li>
                    <li>Green</li>
                </ul>
            </li>

            <li className={styles.FilterType} onClick={handleListClick}>
                <p>Size</p>
                <ul className={showList.size ? styles.FilterListShow : styles.FilterListHide}>
                    <li>XS</li>
                    <li>S</li>
                    <li>M</li>
                    <li>L</li>
                    <li>XL</li>
                </ul>
            </li>

        </ul>
    )
}

export default ProductFilter
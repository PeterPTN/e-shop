import { useState, useEffect, useContext } from 'react';
import { checkIfFilterList } from '../../services/dom-utils';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { PriceFilterContext } from '../../context/PriceFilterProvider';
import { SizeFilterContext } from '../../context/SizeFilterProvider';
import { ColorFilterContext } from '../../context/ColorFilterProvider';
import { FILTERS } from '../../data/constants';
import FilterHeading from '../filterheading/FilterHeading';
import styles from './ProductFilter.module.scss';

interface ListProps {
    [key: string]: boolean
}

const initialState = {
    product: false,
    price: false,
    color: false,
    size: false,
}

const ProductFilter = () => {
    const [showList, setShowList] = useState<ListProps>(initialState);
    const handleListClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLInputElement;
        const filterType = target.innerText.split(" ")[0].toLowerCase();
        const objListKeys = Object.keys(showList);
        if (objListKeys.includes(filterType)) {
            setShowList((current) => ({ ...initialState, [filterType]: !current[filterType] }))
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLInputElement;
            const targetText = target.innerText.split(" ")[0].toLowerCase();
            const targetNode = target.nodeName.toLowerCase();
            if (checkIfFilterList(targetText, targetNode)) return;
            else setShowList({ ...initialState });
        }

        if (showList) document.addEventListener("click", handleClick)

        return () => document.removeEventListener("click", handleClick);
    }, [showList])


    return (
        <>
            <ul className={styles.Filters}>
                {FILTERS.map(filterData => (
                    <FilterHeading
                        onListClick={handleListClick}
                        key={filterData.id}
                        filterData={filterData}
                        showList={showList} />
                ))}
            </ul>
        </>
    )
}

export default ProductFilter
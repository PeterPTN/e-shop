import { checkProductType, checkPriceType, checkColorType, checkSizeType } from '../../services/dom-utils';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { PriceFilterContext } from '../../context/PriceFilterProvider';
import { SizeFilterContext } from '../../context/SizeFilterProvider';
import { ColorFilterContext } from '../../context/ColorFilterProvider';
import { useContext } from 'react'
import styles from './FilterHeading.module.scss';

interface ListObject {
    id: number,
    listHeading: string,
    listItems: string[]
}

interface Props {
    key: number;
    filterData: ListObject;
    onListClick: (e: React.MouseEvent<HTMLLIElement>) => void;
    showList: {
        [key: string]: boolean
    }
}

const FilterHeading = ({ filterData, onListClick, showList }: Props) => {
    const { listHeading, listItems } = filterData;
    const headingType = listHeading.split(" ")[0];
    const { colorFilter, setColorFilter } = useContext(ColorFilterContext);
    const { sizeFilter, setSizeFilter } = useContext(SizeFilterContext);
    const { setPriceFilter } = useContext(PriceFilterContext)
    const { setProductType } = useContext(ProductTypeContext);

    const handleClick = (listItem: string) => {
        if (checkProductType(listItem)) setProductType(listItem);
        else if (checkPriceType(listItem)) setPriceFilter(listItem);
        else if (checkColorType(listItem)) setColorFilter([...colorFilter, listItem]);
        else if (checkSizeType(listItem)) setSizeFilter([...sizeFilter, listItem])
    }

    return (
        <li className={styles.FilterType} onClick={onListClick}>
            <p>{listHeading}</p>

            <ul className={showList[headingType] ? styles.FilterListShow : styles.FilterListHide}>
                {listItems.map((listItem, index) => (
                    <li onClick={() => handleClick(listItem)} key={index} >{listItem}</li>
                ))}
            </ul>
        </li>
    )
}

export default FilterHeading
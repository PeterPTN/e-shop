import { checkProductType, checkPriceType, checkColorType, checkSizeType } from '../../services/dom-utils';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { PriceFilterContext } from '../../context/PriceFilterProvider';
import { SizeFilterContext } from '../../context/SizeFilterProvider';
import { ColorFilterContext } from '../../context/ColorFilterProvider';
import { useContext, useEffect, useRef } from 'react'
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
    const { colorFilter, setColorFilter } = useContext(ColorFilterContext);
    const { sizeFilter, setSizeFilter } = useContext(SizeFilterContext);
    const { priceFilter, setPriceFilter } = useContext(PriceFilterContext)
    const { productType, setProductType } = useContext(ProductTypeContext);
    const { listHeading, listItems } = filterData;
    const listTarget = useRef<any | null>({
        product: "",
        color: "",
        price: "",
        size: "",
    });
    const parentTarget = useRef<any | null>(null);
    const headingType = listHeading.split(" ")[0];

    // I hate this code but refactoring is going to take a while
    const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, listItem: string) => {
        const target = e.target as HTMLLIElement;
        if (checkProductType(listItem)) {
            if (listTarget.current.product !== "" && listTarget.current.product.classList.contains(`${styles.ListStyles}`)) {
                listTarget.current.product.classList.remove(`${styles.ListStyles}`);
            }
            listTarget.current.product = target;
            listTarget.current.product.classList.add(`${styles.ListStyles}`);
            setProductType(listItem)
        }
        else if (checkPriceType(listItem)) {
            const parent = target.parentNode?.previousSibling as HTMLLIElement;
            setPriceFilter(listItem);
            if (listTarget.current.price !== "" && listTarget.current.price.classList.contains(`${styles.ListStyles}`)) {
                listTarget.current.price.classList.remove(`${styles.ListStyles}`);
            }
            listTarget.current.price = target;
            listTarget.current.price.classList.add(`${styles.ListStyles}`);
            parent.classList.add(`${styles.ListParentStyles}`);
        }
        else if (checkColorType(listItem)) {
            const parent = target.parentNode?.previousSibling as HTMLLIElement;
            if (listItem === "clear") {
                setColorFilter("");
                parent.classList.remove(`${styles.ListParentStyles}`);
                return;
            }
            if (listTarget.current.color !== "" && listTarget.current.color.classList.contains(`${styles.ListStyles}`)) {
                listTarget.current.color.classList.remove(`${styles.ListStyles}`);
            }
            listTarget.current.color = target;
            listTarget.current.color.classList.add(`${styles.ListStyles}`);
            parent.classList.add(`${styles.ListParentStyles}`);
            setColorFilter(listItem)
        }
        else if (checkSizeType(listItem)) {
            const parent = target.parentNode?.previousSibling as HTMLLIElement;
            if (listItem === "clear") {
                setSizeFilter("");
                parent.classList.remove(`${styles.ListParentStyles}`);
                return;
            }
            if (listTarget.current.size !== "" && listTarget.current.size.classList.contains(`${styles.ListStyles}`)) {
                listTarget.current.size.classList.remove(`${styles.ListStyles}`);
            }
            listTarget.current.size = target;
            listTarget.current.size.classList.add(`${styles.ListStyles}`);
            parent.classList.add(`${styles.ListParentStyles}`);
            setSizeFilter(listItem)
        }
    }

    useEffect(() => {
        // Add styling to "all" productType
        document.querySelectorAll("li").forEach(e => {
            if (e.textContent === "all") {
                listTarget.current.product = e;
                listTarget.current.product.classList.add(`${styles.ListStyles}`);
            }
        });
        // Add styling to productType parent
        document.querySelectorAll("p").forEach(e => {
            if (e.textContent === "product type") {
                parentTarget.current = e;
                parentTarget.current.classList.add(`${styles.ListParentStyles}`)
            }
        })
        setPriceFilter("");
        setColorFilter("");
        setSizeFilter("")
    }, [])

    // console.log(priceFilter, "price");
    // console.log(productType, "product");
    // console.log(colorFilter, "color");
    // console.log(sizeFilter, "size");

    return (
        <li className={styles.FilterType} onClick={onListClick}>
            <p>{listHeading}</p>

            <ul className={showList[headingType] ? styles.FilterListShow : styles.FilterListHide}>
                {listItems.map((listItem, index) => (
                    <li onClick={(e) => handleClick(e, listItem)} key={index} >{listItem}</li>
                ))}
            </ul>
        </li>
    )
}

export default FilterHeading
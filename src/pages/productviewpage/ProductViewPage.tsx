import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getProduct } from '../../services/firebase-utils';
import { ProductItems } from '../../lib/types';
import { LoaderContext } from '../../context/LoaderProvider';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { setFavouriteProduct } from '../../services/firebase-utils';
import styles from './ProductViewPage.module.scss';
import Loader from '../loaderpage/Loader';
import star from '../../assets/svgs/star.svg';

const ProductViewPage = () => {
  const [starStyles, setStarStyles] = useState<string[]>([styles.StarFalse])
  const { setProductType } = useContext(ProductTypeContext)
  const { loader, setLoader } = useContext(LoaderContext);
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
  const [product, setProduct] = useState<ProductItems | null>();
  const productParam = useParams();
  const navigate = useNavigate();
  const sizesKey = product ? Object.keys(product.sizes) : {};
  console.log(sizesKey);
  const productId = productParam.param ? productParam.param.match(/_([^_]*)$/) : null;
  const productType = productParam.param ? productParam.param.match(/^[^_]*/) : null;

  useEffect(() => {
    const generateProduct = async () => {
      if (productId && productType) {
        const generatedProduct = await getProduct(productId[1], productType[0]);
        setProduct(generatedProduct);
      }
    }
    generateProduct();
  }, [])

  useEffect(() => {
    if (product) product.favourite ? setStarStyles([styles.StarTrue]) : setStarStyles([styles.StarFalse]);
  }, [])

  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);
    setLoader(true);
    setTimeout(() => setLoader(false), 1000);
  }, []);

  const handleNavigateClick = () => {
    setProductType("all");
    navigate("/products");
  }

  const handleImageClick = (index: number) => {
    // Change fat image based on useState array index
  }

  const handleSubmit = () => {
    // add to cart
  }

  const handleFavouriteClick = (e: React.MouseEvent<HTMLElement>) => {
    // Prevent click bubbling to parent click event
    e.stopPropagation();
    if (product) setFavouriteProduct(product.id, product.type, product.favourite);
    const className = starStyles.toString().match(/[a-zA-Z]+/);
    if (className) className[0] === "StarTrue" ? setStarStyles([styles.StarFalse]) : setStarStyles([styles.StarTrue]);
  }

  console.log(product);

  return (
    <div>
      {loader && <Loader />}


      <div className={styles.ProductView}>
        {product
          ?
          <>
            <header>
              <h2>{product.item}</h2>
              <button onClick={handleNavigateClick}>Back to browsing</button>
            </header>

            <main>
              {/* Images */}
              <div className={styles.Images}>
                <div>
                  {/* Maybe render from an array pass in index as arg */}
                  <img onClick={() => handleImageClick(1)} src="" alt="" />
                  <img onClick={() => handleImageClick(2)} src="" alt="" />
                  <img onClick={() => handleImageClick(3)} src="" alt="" />
                </div>

                {/* Fat image */}
                <img src=""  />
              </div>

              {/* Info */}
              <div className={styles.Info}>
                {/* Add description field for product*/}
                <p>{product.item}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur est soluta molestiae autem? Natus magni ut,
                  illum eaque quasi ad ipsam, doloremque sequi fugit,
                  placeat cum distinctio dicta veniam non.
                </p>

                <p>${product.price.toFixed(2)}</p>
                <p>colour: {product.color}</p>
                <img src={star} className={starStyles.join(" ")} onClick={handleFavouriteClick}/>

                <form>
                  <select>
                    <option>Please Select</option>
                    <option disabled={product.sizes.xs === 0 && true} value="XS">XS</option>
                    <option disabled={product.sizes.s === 0 && true} value="S">S</option>
                    <option disabled={product.sizes.m === 0 && true} value="M">M</option>
                    <option disabled={product.sizes.l === 0 && true} value="L">L</option>
                    <option disabled={product.sizes.xl === 0 && true} value="XL">XL</option>
                  </select>

                  <input type="submit" value="Add to cart" onClick={handleSubmit} />
                </form>


              </div>
            </main>
          </>
          :
          <div>
            <h2>Nothing to render </h2>
          </div>
        }
      </div>

    </div >
  )
}

export default ProductViewPage
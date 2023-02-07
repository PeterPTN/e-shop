import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getProduct, addOneToCart, getAllProducts } from '../../services/firebase-utils';
import { ProductItems } from '../../lib/types';
import { LoaderContext } from '../../context/LoaderProvider';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { setFavouriteProduct } from '../../services/firebase-utils';
import styles from './ProductViewPage.module.scss';
import Loader from '../loaderpage/Loader';
import star from '../../assets/svgs/star.svg';
import { CartTotalContext } from '../../context/CartTotalProvider';

interface sizeObj {
  xs: number
  s: number
  m: number
  l: number
  xl: number
}

const initialSizes = {
  xs: 0,
  s: 0,
  m: 0,
  l: 0,
  xl: 0
}

const ProductViewPage = () => {
  const [starStyles, setStarStyles] = useState<string[]>([styles.StarFalse]);
  const [updateLoader, setUpdateLoader] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductItems | null>(null);
  const [productAmount, setProductAmount] = useState<sizeObj>(initialSizes);
  const [relatedProducts, setRelatedProducts] = useState<ProductItems[]>();
  const [showWarning, setShowWarning] = useState(false);
  const { setProductType } = useContext(ProductTypeContext);
  const { loader, setLoader } = useContext(LoaderContext);
  const { smallHeader, setSmallHeader } = useContext(HeaderToggleContext);
  const { setCartNumber } = useContext(CartTotalContext);
  const productParam = useParams();
  const navigate = useNavigate();
  const productId = productParam.param ? productParam.param.match(/_([^_]*)$/) : null;
  const productType = productParam.param ? productParam.param.match(/^[^_]*/) : null;

  const handleNavigateClick = () => {
    setProductType("all");
    navigate("/products");
  }

  const handleRelatedProductClick = (id: string) => {
    navigate(`/products:${id}`);
  }
 
  const handleImageClick = (index: number) => {
    // Change fat image based on useState array index
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (showWarning) setShowWarning(false);
    const target = e.target as HTMLFormElement
    const formData = new FormData(e.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());

    if (formObject.sizes === "") {
      setShowWarning(true);
      return;
    }

    if (product) {
      const size = formObject.sizes as keyof sizeObj;
      setProductAmount({ ...productAmount, [size]: productAmount[size] - 1 })
      adder(size);
    }

    setCartNumber(current => current + 1);
    target.reset();
  }

  const handleFavouriteClick = (e: React.MouseEvent<HTMLElement>) => {
    if (product) setFavouriteProduct(product.id, product.type, product.favourite);
    const className = starStyles.toString().match(/[a-zA-Z]+/);
    if (className) className[0] === "StarTrue" ? setStarStyles([styles.StarFalse]) : setStarStyles([styles.StarTrue]);
  }

  // Update DB
  const adder = async (chosenSize: keyof sizeObj) => {
    if (product && productAmount[chosenSize] !== 0) {
      setUpdateLoader(true);
      await addOneToCart(product.id, product.type, chosenSize);
      setTimeout(() => setUpdateLoader(false), 200);
    }
  }

  // Generate product
  useEffect(() => {
    const generateProduct = async () => {
      if (productId && productType) {
        const generatedProduct = await getProduct(productId[1], productType[0]);
        if (generatedProduct) setProductAmount({ ...generatedProduct.sizes });
        setProduct(generatedProduct);
      }
    }

    const generateRelatedProducts = async () => {
      if (productId) {
        const allProducts = await getAllProducts();
        const pageProduct = allProducts.reduce((object, product) => {
          if (product.id === productId[1] as string) object = { ...product }
          return object
        }, {} as ProductItems);
        const pageProductName = pageProduct.item.match(/\s(\w+)/g)?.join("");
        const relatedProducts = allProducts
          .filter((product) => {
            const productName = product.item.match(/\s(\w+)/g)?.join("");
            return pageProductName === productName;
          })
          .filter((product) => product.item !== pageProduct.item);

        setRelatedProducts(relatedProducts);
      }
      //const pageProduct = product?.item;
      //const relatedProducts = allProducts.filter(product =>)
      //console.log(allProducts);
    }

    const startUp = async () => {
      await generateProduct();
      await generateRelatedProducts();
    }

    startUp();
  }, [])

  // Favourite
  useEffect(() => {
    if (product) product.favourite ? setStarStyles([styles.StarTrue]) : setStarStyles([styles.StarFalse]);
  }, [product])

  // Nav DOM stuff
  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);
    setLoader(true);
    setTimeout(() => setLoader(false), 1000);
  }, []);

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
              {updateLoader &&
                <div className={styles.updateLoader}>
                  <div />
                </div>}
              {/* Images */}
              <div className={styles.Images}>
                <div>
                  {/* Maybe render from an array pass in index as arg */}
                  <img onClick={() => handleImageClick(1)} src="" alt="" />
                  <img onClick={() => handleImageClick(2)} src="" alt="" />
                  <img onClick={() => handleImageClick(3)} src="" alt="" />
                </div>

                {/* Fat image */}
                <img src="" />
              </div>

              {/* Info */}
              <div className={styles.Info}>
                {/* Add description field for product*/}
                <>
                  <p>{product.item}</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur est soluta molestiae autem? Natus magni ut,
                    illum eaque quasi ad ipsam, doloremque sequi fugit,
                    placeat cum distinctio dicta veniam non.
                  </p>

                  <p>${product.price.toFixed(2)}</p>
                  <p>colour: {product.color}</p>
                  <img src={star} className={starStyles.join(" ")} onClick={handleFavouriteClick} />

                  {relatedProducts && relatedProducts.length > 0 && relatedProducts.map(product => (
                    <img onClick={() => handleRelatedProductClick(product.id)} key={product.id} src={product.img[0]} />
                  ))}

                  <form onSubmit={handleSubmit}>
                    <label htmlFor="sizes">Size</label>
                    <select name="sizes" id="sizes">
                      <option value="">Please Select</option>
                      <option disabled={isNaN(product.sizes.xs) || productAmount.xs <= 0} value="xs">XS</option>
                      <option disabled={isNaN(product.sizes.s) || productAmount.s <= 0} value="s">S</option>
                      <option disabled={isNaN(product.sizes.m) || productAmount.m <= 0} value="m">M</option>
                      <option disabled={isNaN(product.sizes.l) || productAmount.l <= 0} value="l">L</option>
                      <option disabled={isNaN(product.sizes.xl) || productAmount.xl <= 0} value="xl">XL</option>
                    </select>

                    <input type="submit" value="Add to cart" />
                  </form>

                  {showWarning && <p>Please select from an available size</p>}

                </>
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
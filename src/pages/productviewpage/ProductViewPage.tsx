import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { getProduct, addOneToCart, getAllProducts } from '../../services/firebase-utils';
import { setFavouriteProduct } from '../../services/firebase-utils';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import { ProductTypeContext } from '../../context/ProductTypeProvider';
import { CartTotalContext } from '../../context/CartTotalProvider';
import { LoaderContext } from '../../context/LoaderProvider';
import { ProductItems } from '../../lib/types';
import styles from './ProductViewPage.module.scss';
import Loader from '../loaderpage/Loader';
import star from '../../assets/svgs/star.svg';

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
  const [forceRender, setForceRender] = useState(false);
  const [imageArray, setImageArray] = useState<string[]>([""]);
  const [showAdded, setShowAdded] = useState(false);
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
    if (product) {
      navigate(`/products/${product.type}_${id}`);
      setForceRender(!forceRender);
    }
  }

  const handleImageClick = () => {
    console.log(imageArray[1]);
    console.log(imageArray[0]);
    setImageArray([imageArray[1], imageArray[0]]);
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
      setShowAdded(true);
      await addOneToCart(product.id, product.type, chosenSize);
      setTimeout(() => setUpdateLoader(false), 200);
      setTimeout(() => setShowAdded(false), 1250);
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
    }

    const startUp = async () => {
      await generateProduct();
      await generateRelatedProducts();
    }
    startUp();
  }, [forceRender])

  // Favourite && image array
  useEffect(() => {
    if (product) {
      product.favourite ? setStarStyles([styles.StarTrue]) : setStarStyles([styles.StarFalse]);
      setImageArray([...product.img])
    }
  }, [product])

  // Nav DOM stuff
  useEffect(() => {
    if (!smallHeader) setSmallHeader(true);
    setLoader(true);
    setTimeout(() => setLoader(false), 1000);
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className={styles.ProductView}>
        {product
          ?
          <>
            <header>
              <h2>{product.item}</h2>
              <button onClick={handleNavigateClick}>Back to products</button>
            </header>

            <main>
              {updateLoader &&
                <div className={styles.updateLoader}>
                  <div />
                </div>}

              <div className={styles.Images}>
                <div>
                  <img onClick={handleImageClick} src={imageArray[1]} alt={product.item} />
                </div>

                <img className={styles.FatImage} src={imageArray[0]} />
              </div>

              <div className={styles.Info}>
                <>
                  <h3><img src={star} className={starStyles.join(" ")} onClick={handleFavouriteClick} />{product.item}</h3>
                  <h4>Product Details:</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur est soluta molestiae autem? Natus magni ut,
                    illum eaque quasi ad ipsam, doloremque sequi fugit,
                    placeat cum distinctio dicta veniam non.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, facilis.
                  </p>

                  <h4>Price:</h4>
                  <p>${product.price.toFixed(2)}</p>

                  <h4>Colour:</h4>
                  <p>{product.color}</p>


                  <h4>Related Products:</h4>
                  <div className={styles.RelatedProducts}>
                    {relatedProducts && relatedProducts.length > 0 && relatedProducts.map(product => (
                      <img onClick={() => handleRelatedProductClick(product.id)} key={product.id} src={product.img[0]} />
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className={styles.Form}>
                    <label htmlFor="sizes">Sizes:</label>
                    <p className={styles.SizeChart}>Sizing chart</p>
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

                  {showWarning && <p className={styles.Warning}>Please select from an available size</p>}
                  {showAdded && <p className={styles.Added}>Product added to cart</p>}
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
    </>
  )
}

export default ProductViewPage
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../products/services/ProductService";
import { productFetchResponse } from "../../products/utils/productResponse";
import RatingStars from "../../ratings/components/RatingStars";
import { RatingService } from "../../ratings/services/RatingService";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const ratingService: RatingService = new RatingService();
  const productService = new ProductService();
  var [productToShow, setProductToShow] = useState<productFetchResponse | null>(
    null
  );

  useEffect(() => {
    if (id) {
      const product: productFetchResponse = productService.fetchProductById(
        Number(id)
      )[0];
      setProductToShow(product);
      console.log("Product is ", product);
    }
  }, [id, productService]);

  return (
    <div className="grid grid-cols-3 p-5">
      <div className="col-span-2 m-5">
        <div className="w-3/6 h-3/6">
          <img
            src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81Y5k2JdsTL._SL1500_.jpg"
            alt="Product Image"
          />
          {productToShow ? (
            <RatingStars
              value={productToShow?.numberOfRatings}
              onChange={ratingService.ratingsChange}
            />
          ) : null}
        </div>
      </div>
      <div className="col-span-1 bg-gray-100 p-6 rounded-lg">
        {productToShow ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{productToShow.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {productToShow.description}
            </p>
            <span className="text-green-500 text-lg mb-4">
              {productToShow.offer}
            </span>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {productToShow.price}
            </h3>
          </div>
        ) : null}
        <div className="flex justify-between">
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600">
            Buy Now
          </button>
          <button className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

import { useEffect } from "react";
import { useSelector } from "react-redux";

import ProductApi from "../../apis/ProductsApi";

const ProductPage = () => {
	const items = useSelector((state) => state.products);
	console.log(items);

	const getProduct = async () => {
		await ProductApi.getProducts();
	};

	useEffect(() => {
		getProduct();
	}, []);

	return <div>ProductPage</div>;
};

export default ProductPage;

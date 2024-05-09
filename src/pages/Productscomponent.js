import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../components/product/ProductCard';
import { GlobalDataStorage } from '../constants';
import './Products.css';

export default function ProductsComponent() {
	const { t } = useTranslation();
	const storage = useContext(GlobalDataStorage);

	// State to store the products to display
	const [products, setProducts] = useState([]);

	// State to store the selected category
	const [options, setOptions] = useState([]);

	const settingOptions = () => {
		fetch('http://localhost/outdoor-gear-final-project%20(php)/php/load.php/loadCategory')
			.then(response => response.json())
			.then(data => {
				setOptions(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	const settingProducts = (categoryId) => {
		console.log(categoryId);
		fetch(`http://localhost/outdoor-gear-final-project%20(php)/php/load.php/loadProducts?cid=${categoryId}`)
			.then(response => response.json())
			.then(data => {
				setProducts(data);
				console.log(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	useEffect(() => {
		settingOptions();
		settingProducts(0);
	}, []);

	// Function to handle the category change
	const onChange = (evt) => {
		const newCategory = evt.target.value;
		settingOptions(newCategory);

		// If the category is 'all', display all products
		if (newCategory === 0) {
			settingProducts(0);
			return;
		}

		// Display products based on the selected category
		settingProducts(newCategory);
	};

	return (
		<div className="d-flex flex-column justify-content-start align-items-center gap-3 p-4">
			<div className="d-flex justify-content-between w-75">
				<h1 className="welcome">{t('products.title')}</h1>
				<select
					className="form-select"
					onChange={onChange}
					style={{
						width: '200px',
					}}
				>
					<option value="0">all</option>
					{options.map((option, index) => (
						<option key={index} value={option.cid}>
							{option.cname}
						</option>
					))}
				</select>
			</div>
			<div className="d-flex flex-wrap justify-content-center gap-3">
				{products?.length > 0 && products.map((product) => <ProductCard key={product.pid} product={product} />)}
			</div>
		</div>
	);
}

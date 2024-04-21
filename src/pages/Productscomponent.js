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
	const [category, setCategory] = useState('all');

	useEffect(() => {
		// If the category is 'all', display all products
		if (category === 'all') {
			setProducts(storage.products);
			return;
		}

		// Display products based on the selected category
		setProducts(storage.perCategory.get(category));
	}, [category, storage.products, storage.perCategory]);

	// Function to handle the category change
	const onChange = (evt) => {
		setCategory(evt.target.value);
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
					<option value="all">{t('products.categories.all')}</option>
					{[...storage.perCategory.keys()].map((selectCategory) => (
						<option key={selectCategory} value={selectCategory}>
							{t(`products.categories.${selectCategory}`)}
						</option>
					))}
				</select>
			</div>
			<div className="d-flex flex-wrap justify-content-center gap-3">
				{storage?.products?.length > 0 && products.map((product) => <ProductCard key={product.id} product={product} />)}
			</div>
		</div>
	);
}

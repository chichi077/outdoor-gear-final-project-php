import { Cube } from '@phosphor-icons/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalDataStorage } from '../../constants';
import { useAlerts } from '../../hooks/useAlerts';

export function ProductCard({ product, onChange, onRemove }) {
	const storage = useContext(GlobalDataStorage);
	const { addAlert } = useAlerts();
	const { t, i18n } = useTranslation();
	const [quantity, setQuantity] = useState(product.quantity || 0);

	const selectedLanguage = i18n.language;

	const addToCart = () => {
		addAlert({ message: 'Product added to cart', type: 'success' });
		storage.cart.addToCart(product);
	};

	// const { name, description } = useMemo(
	// 	() => (selectedLanguage === 'en' ? product : product.i18n[selectedLanguage]),
	// 	[selectedLanguage, product],
	// );

	const onInputChange = (evt) => {
		const { value } = evt.target;
		setQuantity(value);
	}

	const onBtnRemove = () => {
		if (onRemove) {
			onRemove(product);
			return;
		}

		storage.cart.removeFromCart(product);

	}

	useEffect(() => {
		if (onChange) {
			onChange(product, quantity);
			return
		}

		storage.cart.updateQuantity(product, quantity);
	}, [onChange, product, quantity, storage.cart]);

	return (
		<div className="card" style={{ width: '18rem' }}>
			<img
				alt={name}
				className="card-img-top"
				src={product.img_addr}
				style={{
					height: '200px',
					objectFit: 'cover',
				}}
			/>
			<div className="card-body">
				<h3 className="card-title d-flex justify-content-between align-items-center">
					{product.pname}
					{/* {product?.model && <Cube size={18} weight="bold" />} */}
				</h3>
				<p className="card-text">{product.description}</p>
				{product?.quantity && (
					<input
						className="form-control"
						onChange={onInputChange}
						type="number"
						value={quantity}
					/>
				)}
				<p className="card-text">${product.price}</p>
			</div>
			<div className="card-footer d-flex justify-content-between">
				{product.quantity ? (<button
					className="btn btn-danger"
					onClick={onBtnRemove}
					style={{
						textTransform: 'capitalize',
					}}
					type="button"
				>
					{t('product_card.remove_from_cart')}
				</button>) : (
					<button
						className="btn btn-primary"
						onClick={addToCart}
						style={{
							textTransform: 'capitalize',
						}}
						type="button"
					>
						{t('product_card.add_to_cart')}
					</button>
				)}
				<a className="btn btn-secondary" href={`/products/${product.id}`} style={{ textTransform: 'capitalize' }}>
					{t('product_card.goto_product')}
				</a>
			</div>
		</div>
	);
}

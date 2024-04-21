import { Campfire, Cube, Recycle, Trash } from '@phosphor-icons/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ModelRenderer } from '../../components/3d/index';
import { GlobalDataStorage } from '../../constants';
import { useAlerts } from '../../hooks/useAlerts';
import ProductReviewForm from '../admin/ProductReviewForm';

export function ProductPage() {
	const { id } = useParams();
	const storage = useContext(GlobalDataStorage);
	const { addAlert } = useAlerts();
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [showReviewForm, setShowReviewForm] = useState(false);

	const selectedLanguage = i18n.language;

	/**
	 * @type {[any, Function]}
	 */
	const [product, setProduct] = useState(null);

	useEffect(() => {
		if (!storage?.data.size) {
			return;
		}

		const hasProduct = storage?.data.get(id);

		if (hasProduct) {
			setProduct(hasProduct);
			return;
		}

		navigate('../');
	}, [id, navigate, storage, product]);

	const addProductToCart = () => {
		storage.cart.addToCart(product);
		addAlert({ message: 'Product added to cart', type: 'success' });
	};

	const toggleReviewForm = () => setShowReviewForm(!showReviewForm);
	const { name, description } = useMemo(
		() =>
			product
				? selectedLanguage === 'en'
					? product
					: product.i18n[selectedLanguage]
				: {
					name: '',
					description: '',
				},
		[selectedLanguage, product],
	);

	return (
		<div className="d-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
			{product?.model ? (
				<ModelRenderer
					height="500px"
					modelPath={product.model.fileUrl}
					scaleFactor={product.model.scaleFactor}
					width="100%"
				/>
			) : (
				<div className="d-flex justify-content-center align-items-center p-3">
					<img
						alt={name}
						className="h-100 object-cover"
						src={product?.image}
						style={{
							maxHeight: '100vh',
						}}
					/>
				</div>
			)}
			<div className="d-flex flex-column p-4 justify-content-between">
				<div className="d-flex flex-column gap-3">
					<h1 className="d-flex align-items-center justify-content-between gap-2">
						{name}
						{product?.model && <Cube size={32} weight="bold" />}
					</h1>
					<p>{description}</p>
					<p className="text-success fs-3">CA$ {product?.price}</p>
					<div className="d-flex flex-column gap-3">
						<div className="d-flex gap-2 align-items-center">
							<Campfire color="var(--bs-warning)" size={24} />
							<strong>{t('product.carbon_footprint')}:</strong> {product?.environmentalImpact?.carbonFootprint}
						</div>
						{product?.environmentalImpact?.recyclableMaterials && (
							<div className="d-flex gap-2 align-items-center">
								<Recycle color="var(--bs-success)" size={24} />
								{t('product.recyclable_materials')}
							</div>
						)}
						<div className="d-flex gap-2 align-items-center">
							<Trash color="var(--bs-danger)" size={24} />
							<strong>{t('product.end_of_life_options')}:</strong> {product?.environmentalImpact?.endOfLifeOptions}
						</div>
					</div>
				</div>
				<button className="btn btn-primary" onClick={addProductToCart} type="button">
					{t('product.add_to_cart')}
				</button>
				<button className="btn btn-primary" onClick={toggleReviewForm} type="submit">Add Review</button>
				{showReviewForm && <ProductReviewForm product={product} />}</div>
		</div>
	);
}
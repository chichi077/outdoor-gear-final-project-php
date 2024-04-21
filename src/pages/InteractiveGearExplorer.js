import { CaretDoubleLeft, CaretDoubleRight } from '@phosphor-icons/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../components/product/ProductCard';
import { GlobalDataStorage } from '../constants';

const IMAGE_MAP = {
	hiking: '/images/interactive_hiking.jpeg',
	climbing: '/images/interactive_climbing.jpeg',
	camping: '/images/interactive_camping.jpeg',
};

export function InteractiveGearExplorer() {
	const storage = useContext(GlobalDataStorage);
	const { t } = useTranslation();
	console.log('Storage:', storage);

	// eslint-disable-next-line no-unused-vars
	const [step, setStep] = useState(0);

	// eslint-disable-next-line no-unused-vars
	const [activity, setActivity] = useState('');
	const [budget, setBudget] = useState(0);
	const [recommendedProducts, setRecommendedProducts] = useState([]);

	const isValid = useMemo(
		() => Boolean(activity && recommendedProducts.length && (step === 1 ? budget : true) && step < 2),
		[activity, budget, step, recommendedProducts],
	);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log('Activity:', activity);
		if (!activity) return;
		const randomRecommendedProducts = storage.getRecommendedProducts(activity, budget || undefined);

		setRecommendedProducts(randomRecommendedProducts);
	}, [activity, budget, storage]);

	return (
		<div className="container-fluid p-4 d-flex justify-items-center align-items-center">
			<div className="w-100 h-100 border-1 border border-dark-subtle rounded p-3 d-flex flex-column justify-content-between align-items-center gap-3 shadow">
				<h2>{t(`interactive_gear_explorer.steps.${step}`)}</h2>
				{step < 2 && (
					<img
						alt="activity"
						className="img-fluid border-1 border border-dark-subtle rounded"
						src={IMAGE_MAP[activity] || '/images/interactive_outdoor.jpeg'}
						style={{
							maxHeight: '300px',
						}}
					/>
				)}
				{step === 0 && (
					<div className="d-flex gap-2">
						<button
							className={`btn btn-primary ${activity === 'hiking' ? 'btn-success' : ''}`}
							onClick={() => setActivity('hiking')}
							style={{ width: '100px', textTransform: 'capitalize' }}
							type="button"
						>
							{t('interactive_gear_explorer.buttons.hiking')}
						</button>
						<button
							className={`btn btn-primary ${activity === 'climbing' ? 'btn-success' : ''}`}
							onClick={() => setActivity('climbing')}
							style={{ width: '100px', textTransform: 'capitalize' }}
							type="button"
						>
							{t('interactive_gear_explorer.buttons.climbing')}
						</button>
						<button
							className={`btn btn-primary ${activity === 'camping' ? 'btn-success' : ''}`}
							onClick={() => setActivity('camping')}
							style={{ width: '100px', textTransform: 'capitalize' }}
							type="button"
						>
							{t('interactive_gear_explorer.buttons.camping')}
						</button>
					</div>
				)}
				{step === 1 && (
					<div className="d-flex gap-2">
						<button
							className={`btn btn-primary ${budget === 100 ? 'btn-success' : ''}`}
							onClick={() => setBudget(100)}
							style={{ width: '100px' }}
							type="button"
						>
							$100
						</button>
						<button
							className={`btn btn-primary ${budget === 200 ? 'btn-success' : ''}`}
							onClick={() => setBudget(200)}
							style={{ width: '100px' }}
							type="button"
						>
							$200
						</button>
						<button
							className={`btn btn-primary ${budget === 300 ? 'btn-success' : ''}`}
							onClick={() => setBudget(300)}
							style={{ width: '100px' }}
							type="button"
						>
							$300
						</button>
					</div>
				)}

				{step >= 2 && (
					<div className="d-flex gap-3 flex-wrap justify-content-center">
						{recommendedProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}

				<div className="d-flex gap-2 justify-content-center w-100">
					<button className="btn btn-secondary" disabled={!step} onClick={() => setStep(step - 1)} type="button">
						<CaretDoubleLeft size={22} />
					</button>
					<button className="btn btn-secondary" disabled={!isValid} onClick={() => setStep(step + 1)} type="button">
						<CaretDoubleRight size={22} />
					</button>
				</div>
			</div>
		</div>
	);
}

import { Leaf, ShoppingBagOpen, Wrench } from '@phosphor-icons/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function HomePage() {
	const { t } = useTranslation();

	return (
		<div className="d-flex flex-column align-items-center gap-2">
			<div
				className=""
				style={{
					fontSize: '7rem',
				}}
			>
				{t('home.title')}
			</div>
			<div
				className="d-grid align-items-center w-100"
				style={{
					gridTemplateColumns: '1fr 3fr',
				}}
			>
				<div className="d-flex flex-column gap-3 p-5">
					<h1
						className="my-5 mx-auto"
						style={{
							width: 'fit-content',
						}}
					>
						{t('home.products')}
					</h1>
					<Link className="btn btn-primary" to="/products">
						<ShoppingBagOpen size={32} />
					</Link>
				</div>
				<img
					alt="Gear up for outdoors"
					className="rounded-start object-fit-cover"
					src="/images/interactive_camping.jpeg"
					style={{ width: '100%', height: '400px' }}
				/>
			</div>
			<div
				className="d-grid align-items-center w-100"
				style={{
					gridTemplateColumns: '3fr 1fr',
				}}
			>
				<img
					alt="Gear up for outdoors"
					className="rounded-end object-fit-cover"
					src="/images/environmental1.jpg"
					style={{ width: '100%', height: '400px' }}
				/>
				<div className="d-flex flex-column gap-3 p-5">
					<h1
						className="my-5 mx-auto"
						style={{
							width: 'fit-content',
						}}
					>
						{t('home.environmental')}
					</h1>
					<Link className="btn btn-success" to="/environmental">
						<Leaf size={32} />
					</Link>
				</div>
			</div>
			<div
				className="d-grid align-items-center w-100"
				style={{
					gridTemplateColumns: '1fr 3fr',
				}}
			>
				<div className="d-flex flex-column gap-3 p-5">
					<h1
						className="my-5 mx-auto"
						style={{
							width: 'fit-content',
						}}
					>
						{t('home.interactive')}
					</h1>
					<Link className="btn btn-secondary" to="/interactive">
						<Wrench size={32} />
					</Link>
				</div>
				<img
					alt="Gear up for outdoors"
					className="rounded-start object-fit-cover"
					src="/images/environmental2.jpg"
					style={{ width: '100%', height: '400px' }}
				/>
			</div>
		</div>
	);
}

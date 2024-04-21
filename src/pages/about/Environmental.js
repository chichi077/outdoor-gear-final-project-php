import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EnvironmentalCommitment() {
	const { t } = useTranslation();

	return (
		<div className="environmental-commitment container">
			<h1
				className="my-5 mx-auto"
				style={{
					width: 'fit-content',
				}}
			>
				{t('environment.title')}
			</h1>
			<ul className="list-unstyled d-flex flex-column gap-4">
				<li className="mb-3 d-flex gap-3 justify-content-between">
					<div>
						<h2>{t('environment.sustainable_materials.title')}</h2>
						<p className="fs-5">{t('environment.sustainable_materials.description')}</p>
					</div>
					<img
						alt="Sustainable materials"
						className="rounded object-fit-cover"
						src="/images/interactive_camping.jpeg"
						style={{ width: '300px', height: '200px' }}
					/>
				</li>
				<li className="mb-3 d-flex gap-3 justify-content-between">
					<img
						alt="Sustainable materials"
						className="rounded object-fit-cover"
						src="/images/interactive_outdoor.jpeg"
						style={{ width: '300px', height: '200px' }}
					/>
					<div>
						<h2>{t('environment.energy_efficiency.title')}</h2>
						<p className="fs-5">{t('environment.energy_efficiency.description')}</p>
					</div>
				</li>
				<li className="mb-3 d-flex gap-3 justify-content-between">
					<div>
						<h2>{t('environment.waste_reduction.title')}</h2>
						<p className="fs-5">{t('environment.waste_reduction.description')}</p>
					</div>
					<img
						alt="Sustainable materials"
						className="rounded object-fit-cover"
						src="/images/interactive_climbing.jpeg"
						style={{ width: '300px', height: '200px' }}
					/>
				</li>
				<li className="mb-3 d-flex gap-3 justify-content-between">
					<img
						alt="Sustainable materials"
						className="rounded object-fit-cover"
						src="/images/environmental3.jpg"
						style={{ width: '300px', height: '200px' }}
					/>
					<div>
						<h2>{t('environment.green_packaging.title')}</h2>
						<p className="fs-5">{t('environment.green_packaging.description')}</p>
					</div>
				</li>
				<li className="mb-3 d-flex gap-3 justify-content-between">
					<div>
						<h2>{t('environment.ecological_conservation.title')}</h2>
						<p className="fs-5">{t('environment.ecological_conservation.description')}</p>
					</div>
					<img
						alt="Sustainable materials"
						className="rounded object-fit-cover"
						src="/images/environmental2.jpg"
						style={{ width: '300px', height: '200px' }}
					/>
				</li>
				<li className="mb-3 d-flex gap-3 justify-content-between">
					<img
						alt="Sustainable materials"
						className="rounded object-fit-cover"
						src="/images/environmental1.jpg"
						style={{ width: '300px', height: '200px' }}
					/>
					<div>
						<h2>{t('environment.education_and_collaboration.title')}</h2>
						<p className="fs-5">{t('environment.education_and_collaboration.description')}</p>
					</div>
				</li>
			</ul>
		</div>
	);
}

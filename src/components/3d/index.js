import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { SceneRenderer } from './renderer';

/**
 * @param {{ modelPath: string, width: string, height: string, scaleFactor?: number }} param0
 */
export function ModelRenderer({ modelPath, width, height, scaleFactor }) {
	/**
	 * @type {React.RefObject<HTMLCanvasElement | null>}
	 */
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		const listener = (evt) => {
			evt.preventDefault();
		};

		canvas.addEventListener('wheel', listener, { passive: false });

		// eslint-disable-next-line consistent-return
		return () => {
			canvas.removeEventListener('wheel', listener);
		};
	}, [canvasRef]);

	return (
		// @ts-ignore
		<Canvas ref={canvasRef} style={{ height, width, overscrollBehavior: 'contain' }}>
			<SceneRenderer modelPath={modelPath} scaleFactor={scaleFactor} />
		</Canvas>
	);
}

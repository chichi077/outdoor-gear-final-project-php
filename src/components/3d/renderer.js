import { a, useSpring } from '@react-spring/three';
import { useLoader, useThree } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import React from 'react';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ZOOM_SCALE_DOWN = 10;

/**
 * @param {{ modelPath: string }} param0
 */
function Model({ modelPath }) {
	const gltf = useLoader(GLTFLoader, modelPath);
	return <primitive object={gltf.scene} />;
}

/**
 * @param {{ modelPath: string, scaleFactor?: number }} param0
 */
export function SceneRenderer({ modelPath }) {
	const bgTexture = useLoader(TextureLoader, '/images/scene_bg.jpeg');

	const { size, viewport, scene, camera } = useThree();
	scene.background = bgTexture;
	const aspect = size.width / viewport.width;
	// How can I add user controls to this 3D model?
	const [spring, set] = useSpring(() => ({
		scale: [1, 1, 1],
		position: [0, 0, 0],
		rotation: [0, 0, 0],
		config: { friction: 50 },
	}));

	const bind = useGesture({
		onDrag: ({ offset: [x, y] }) => {
			set({
				rotation: [y / aspect, x / aspect, 0],
			});
		},
		onWheel: ({ delta: [, y] }) => {
			console.log('y', y);
			camera.position.z = Math.max(camera.position.z + y / ZOOM_SCALE_DOWN, 1);
		},
	});

	return (
		<>
			<ambientLight intensity={Math.PI / 2} />

			{/* @ts-ignore */}
			<a.mesh {...spring} {...bind()} castShadow>
				<Model modelPath={modelPath} />
			</a.mesh>
		</>
	);
}

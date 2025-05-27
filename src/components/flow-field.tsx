"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

const TOTAL = 200;
const SPEED = 0.002;
const noise3D = createNoise3D();

const getRandomChar = () => String.fromCharCode(33 + Math.floor(Math.random() * 94));

/** Custom shape from your cube SVG, simplified as 2D points (scaled & centered) */
const shapePath = [
	[5.6, -2.1],
	[0, -5],
	[-5.6, -2.1],
	[0, 0.8],
	[5.6, -2.1], // top face
	[5.6, 2.1],
	[0, 5],
	[-5.6, 2.1],
	[0, 0.8],
	[5.6, 2.1], // bottom face
	[-5.6, -2.1],
	[-5.6, 2.1], // left
	[5.6, -2.1],
	[5.6, 2.1], // right
	[0, 0.8],
	[0, 5], // bottom center
	[0, -5],
	[0, 0.8], // top center
];

/** Helper to interpolate t ∈ [0, 1] across path points */
function basePath(t: number): THREE.Vector3 {
	const pts = shapePath;
	const total = pts.length;
	const i = Math.floor(t * total) % total;
	const next = (i + 1) % total;
	const localT = (t * total) % 1;

	const p1 = new THREE.Vector2(...pts[i]);
	const p2 = new THREE.Vector2(...pts[next]);

	const interp = p1.clone().lerp(p2, localT);
	return new THREE.Vector3(interp.x, interp.y, 0).multiplyScalar(1.5);
}

type ParticleData = {
	ref: React.RefObject<THREE.Group>;
	originalT: number;
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	offset: number;
	char: string;
	scale: number;
};

const FlowWithMouse = () => {
	const { viewport, mouse } = useThree();
	const [lastMouse, setLastMouse] = useState(new THREE.Vector2());

	const particles = useMemo<ParticleData[]>(() => {
		return new Array(TOTAL).fill(0).map((_, i) => ({
			ref: React.createRef<THREE.Group>(),
			originalT: i / TOTAL,
			position: new THREE.Vector3(),
			velocity: new THREE.Vector3(),
			offset: Math.random() * 1000,
			char: getRandomChar(),
			scale: 0.3 + Math.random() * 0.3,
		}));
	}, []);

	const geometryRef = useRef<THREE.BufferGeometry>(null);
	const linePositions = useMemo(() => new Float32Array(TOTAL * 6), []);

	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();

		const mouseVec = new THREE.Vector2((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2);
		const deltaMouse = mouseVec.clone().sub(lastMouse);
		const cursorVelocity = deltaMouse.length() * 60;
		setLastMouse(mouseVec);

		particles.forEach((p) => {
			const t = (p.originalT + time * SPEED) % 1;
			const base = basePath(t);

			const deviation = noise3D(base.x * 0.2, base.y * 0.2, time + p.offset) * 0.4;
			const normal = new THREE.Vector3(base.y, -base.x, 0).normalize().multiplyScalar(deviation);
			const target = base.clone().add(normal);

			const diff = target.clone().sub(p.position);
			const springStrength = Math.min(0.005 + diff.length() * 0.002, 0.02);
			const spring = diff.multiplyScalar(springStrength);
			p.velocity.add(spring);

			const distanceToMouse = p.position.distanceTo(new THREE.Vector3(mouseVec.x, mouseVec.y, 0));
			if (distanceToMouse < 3) {
				const push = p.position
					.clone()
					.sub(new THREE.Vector3(mouseVec.x, mouseVec.y, 0))
					.normalize();
				const strength = (1 - distanceToMouse / 3) * cursorVelocity * 0.005;
				p.velocity.add(push.multiplyScalar(strength));
			}

			p.velocity.multiplyScalar(0.95);
			p.position.add(p.velocity);
			p.ref.current?.position.copy(p.position);
		});

		let lineIndex = 0;
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				if (lineIndex >= linePositions.length) break;

				const a = particles[i].position;
				const b = particles[j].position;
				const dist = a.distanceTo(b);
				if (dist < 1.5 && Math.random() < 0.05) {
					linePositions.set(a.toArray(), lineIndex);
					linePositions.set(b.toArray(), lineIndex + 3);
					lineIndex += 6;
				}
			}
		}

		if (geometryRef.current) {
			geometryRef.current.setDrawRange(0, lineIndex / 3);
			geometryRef.current.attributes.position.needsUpdate = true;
		}
	});

	return (
		<>
			{particles.map((p, i) => (
				<group key={i} ref={p.ref}>
					<Text fontSize={p.scale} color="white" anchorX="center" anchorY="middle" toneMapped={false}>
						{p.char}
					</Text>
				</group>
			))}
			<lineSegments>
				<bufferGeometry ref={geometryRef}>
					<bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
				</bufferGeometry>
				<lineBasicMaterial color="white" transparent opacity={0.5} />
			</lineSegments>
		</>
	);
};

export default function FlowFieldScene() {
	return (
		<Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
			<ambientLight intensity={1} />
			<FlowWithMouse />
		</Canvas>
	);
}

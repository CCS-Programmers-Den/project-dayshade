import React, { useRef } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Extend GLTF type
type GLTFResult = {
  nodes: {
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
  };
  materials: { [key: string]: THREE.Material };
};

export function PDLogo(props: React.ComponentProps<'group'>) {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF("/assets/pd-logo.glb") as unknown as GLTFResult;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // sway gently left (-0.2 rad) and right (+0.2 rad)
    group.current.rotation.z = Math.sin(t) * 0.7;
  });
  return (
    <group 
    ref={group}
    {...props} 
    dispose={null} 
    rotation={[-Math.PI / 2, 0, 0]} 
    position={[0, -8, 0]}
    scale={[-2, 2, 2]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[-1.06855, 0, 2.54475]}
        scale={0.15796}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.001']}
        position={[0.48636, 0, 4.37214]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.15796}
      />
    </group>
  )
}

useGLTF.preload('/assets/pd-logo.glb')

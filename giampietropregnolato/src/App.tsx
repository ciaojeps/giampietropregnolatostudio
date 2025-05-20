import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei" // Removed useTexture as it's not used
import { Physics, useSphere } from "@react-three/cannon"
import { EffectComposer, N8AO, SMAA, Bloom } from "@react-three/postprocessing"
import React from "react" // React is implicitly imported in modern Next.js/CRA, but good to have for clarity

// Global constants for the scene
const COUNT = 40;
const rfs = THREE.MathUtils.randFloatSpread; // Helper for random float spread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Shared sphere geometry
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 1 }); // Shared material for baubles

// Main application component
export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }} style={{ touchAction: 'none' }}> {/* Added touchAction to Canvas for better mobile */}
      <ambientLight intensity={Math.PI / 2} /> {/* Using Math.PI for intensity is common */}
      <color attach="background" args={["#dfdfdf"]} />
      <spotLight 
        intensity={100} // Increased intensity for more visible light
        angle={0.2} 
        penumbra={1} 
        position={[30, 30, 30]} 
        castShadow 
        shadow-mapSize={[512, 512]} 
      />
      <Physics gravity={[0, 0, 0]} iterations={1}>
        <Pointer />
        <Clump />
      </Physics>
      {/* Ensure the HDR file is in the public folder and the path is correct */}
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer enableNormalPass={false}>
        <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
        <Bloom mipmapBlur levels={7} intensity={0.1} luminanceThreshold={0} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  )
}



// Component for the group of spheres (clump)
function Clump() {
  // useSphere hook from @react-three/cannon
  // The first generic argument <THREE.InstancedMesh> is crucial.
  // It tells TypeScript that 'ref.current' will be an InstancedMesh.
  const [ref, api] = useSphere<THREE.InstancedMesh>(
    () => ({ // This function is called for each instance to define its physics properties
      args: [1], // Radius of the sphere for physics simulation
      mass: 1,   // Mass of each sphere
      angularDamping: 0.1,
      linearDamping: 0.65,
      // Initial position for each sphere, randomized
      position: [rfs(20), rfs(20), rfs(20)],
    }),
    // The second argument (fwdRef) is undefined here, meaning useSphere creates and returns the ref.
    // The number of instances (COUNT) will be taken from the <instancedMesh /> args.
  );

  // THREE.Matrix4 and THREE.Vector3 are used for calculations in useFrame
  // It's good practice to memoize them if Clump could re-render frequently,
  // but in this setup, Clump renders once, so direct instantiation is fine.
  const mat = React.useMemo(() => new THREE.Matrix4(), []);
  const vec = React.useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Ensure ref.current exists (it might not on the very first frame or if unmounted)
    if (!ref.current) return;

    // Loop through each instance of the InstancedMesh
    for (let i = 0; i < COUNT; i++) {
      // Get the current transformation matrix of the i-th instance
      ref.current.getMatrixAt(i, mat);
      
      // Apply a force to the i-th instance
      // The force pulls the instance towards the origin (0,0,0)
      // api.at(i) provides access to the physics API for the i-th instance
      api.at(i).applyForce(
        vec.setFromMatrixPosition(mat) // Get current position from the matrix
           .normalize()                // Get direction towards origin (by normalizing position vector)
           .multiplyScalar(-40)        // Scale the force (negative to pull towards origin)
           .toArray(),                 // Convert THREE.Vector3 to [x, y, z] array for cannon
        [0, 0, 0]                     // Point of application of the force (center of the instance)
      );
    }
    // After updating physics, the InstancedMesh needs to be told to update its instance matrices.
    // @react-three/cannon usually handles this automatically for meshes linked via its hooks.
    // If not, you might need: ref.current.instanceMatrix.needsUpdate = true;
  });

  // Render the InstancedMesh
  return (
    <instancedMesh
      ref={ref} // Assign the ref from useSphere
      // args: [geometry, material, count]
      args={[sphereGeometry, baubleMaterial, COUNT]}
      castShadow
      receiveShadow
    />
    // Note: No child <meshStandardMaterial /> is needed here because
    // baubleMaterial is passed directly in the args.
  );
}

// Component for the kinematic sphere controlled by the mouse pointer
function Pointer() {
  const viewport = useThree((state) => state.viewport); // Gets viewport dimensions
  const { camera } = useThree(); // Get camera for raycasting or depth calculation if needed

  // useSphere for a kinematic body (not affected by forces, but can affect others)
  const [ref, api] = useSphere(() => ({ 
    type: "Kinematic", 
    args: [1.5], // Slightly larger args for interaction
    position: [0, 0, 0] 
  }));

  useFrame((state) => {
    // Update the kinematic sphere's position based on the mouse pointer
    // state.pointer contains normalized (-1 to 1) mouse coordinates
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    // To keep the pointer on a plane, we can set z based on camera or a fixed value
    // For simplicity, keeping it at z=0, but you might want to project it onto a plane
    // relative to the camera for more intuitive 3D interaction.
    api.position.set(x, y, 0);
  });

  // The visible mesh for the pointer (optional, could be invisible)
  return (
    // The ref from useSphere is attached to this mesh so cannon knows its position
    <mesh ref={ref} scale={0.2}> {/* Scale down the visual representation */}
      <sphereGeometry args={[1, 16, 16]} /> {/* Simpler geometry for pointer */}
      <meshBasicMaterial 
        color={[0.1, 0.2, 0.8]} // A distinct color for the pointer
        transparent 
        opacity={0.5} 
        toneMapped={false} 
      />
      {/* A point light attached to the pointer can create interesting effects */}
       <pointLight intensity={10} distance={5} color="lightblue" /> 
    </mesh>
  );
}


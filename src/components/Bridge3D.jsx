import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Person({ position, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial color="#f8d7b5" />
      </mesh>

      <mesh position={[0, 0.38, 0]}>
        <capsuleGeometry args={[0.14, 0.45, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[-0.07, 0.02, 0]}>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      <mesh position={[0.07, 0.02, 0]}>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[0.9, 0.18, 0.04]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function WoodenBridge() {
  const wood = "#b8753d";
  const darkWood = "#7c3f1d";

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.4, 0.18, 1.15]} />
        <meshStandardMaterial color={wood} roughness={0.55} />
      </mesh>

      {[-1.35, -0.7, 0, 0.7, 1.35].map((x) => (
        <mesh key={x} position={[x, 0.12, 0]}>
          <boxGeometry args={[0.08, 0.08, 1.22]} />
          <meshStandardMaterial color={darkWood} />
        </mesh>
      ))}

      {[-1.65, 1.65].map((x) =>
        [-0.55, 0.55].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.55, z]}>
            <boxGeometry args={[0.18, 1.1, 0.18]} />
            <meshStandardMaterial color={wood} roughness={0.5} />
          </mesh>
        ))
      )}

      {[-0.58, 0.58].map((z) => (
        <mesh key={z} position={[0, 1.05, z]} rotation={[0, 0, 0]}>
          <torusGeometry args={[1.75, 0.04, 16, 80, Math.PI]} />
          <meshStandardMaterial color={wood} roughness={0.45} />
        </mesh>
      ))}

      {[-1.05, -0.45, 0.15, 0.75, 1.25].map((x) =>
        [-0.58, 0.58].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.65, z]}>
            <boxGeometry args={[0.08, 0.75, 0.08]} />
            <meshStandardMaterial color={wood} />
          </mesh>
        ))
      )}
    </group>
  );
}

function BridgeScene() {
  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.45}>
      <group rotation={[0.18, -0.45, 0]}>
        <WoodenBridge />
        <Person position={[-1.15, 0.22, -0.15]} color="#60a5fa" label="Employee" />
        <Person position={[1.15, 0.22, 0.15]} color="#2563eb" label="Employer" />
      </group>
    </Float>
  );
}

export default function Bridge3D() {
  return (
    <div className="h-[350px] w-full">
      <Canvas camera={{ position: [0, 1.7, 4.8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} />
        <pointLight position={[-3, 2, 3]} intensity={1.2} color="#60a5fa" />
        <BridgeScene />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
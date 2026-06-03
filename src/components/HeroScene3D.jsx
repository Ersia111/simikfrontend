import { Stars, Sparkles } from "@react-three/drei";

function HeroScene3D() {
  return (
    <>
      <color attach="background" args={["#050b1a"]} />

      <ambientLight intensity={0.6} />
      <pointLight position={[0, 2, 4]} intensity={2.2} color="#60a5fa" />
      <pointLight position={[-4, 1, 3]} intensity={1.4} color="#a78bfa" />

      <Stars
        radius={80}
        depth={40}
        count={1600}
        factor={4}
        saturation={0}
        fade
        speed={0.7}
      />

      <Sparkles
        count={120}
        scale={[7, 4, 3]}
        size={2.5}
        speed={0.45}
        opacity={0.55}
        color="#60a5fa"
      />

      
    </>
  );
}

export default HeroScene3D;
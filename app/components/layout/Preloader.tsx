"use client";
import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   GOLD DUST PARTICLES — atmospheric floating specks
   ───────────────────────────────────────────────────────────── */
function GoldParticles() {
  const ref = useRef<THREE.Points>(null);

  const { positions } = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = Math.random() * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return { positions };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      (ref.current.material as THREE.PointsMaterial).opacity =
        0.3 + Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C9A84C"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────
   GRID FLOOR — glowing gold lines on dark ground
   ───────────────────────────────────────────────────────────── */
function GlowGrid() {
  return (
    <>
      {/* dark ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#080706" roughness={1} metalness={0} />
      </mesh>
      {/* gold grid overlay */}
      <gridHelper
        args={[16, 32, "#C9A84C", "#C9A84C"]}
        position={[0, 0.001, 0]}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ORBITING CAMERA — slow cinematic rotation
   ───────────────────────────────────────────────────────────── */
function OrbitalCamera({ paused }: { paused: boolean }) {
  const { camera } = useThree();
  const angle = useRef(Math.PI / 5); // starting angle

  useEffect(() => {
    // Initial position
    camera.position.set(9, 5, 9);
    (camera as THREE.PerspectiveCamera).fov = 36;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 1.2, 0);
  }, [camera]);

  useFrame((_, delta) => {
    if (paused) return;
    angle.current += delta * 0.14;
    const r = 9.5;
    camera.position.x = Math.sin(angle.current) * r;
    camera.position.z = Math.cos(angle.current) * r;
    camera.position.y = 4.5 + Math.sin(angle.current * 0.4) * 0.6;
    camera.lookAt(0, 1.2, 0);
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────
   HOUSE SCENE — luxury dark villa with GSAP build timeline
   ───────────────────────────────────────────────────────────── */
function HouseScene({ onDone }: { onDone: () => void }) {
  const [cameraFree, setCameraFree] = useState(true);

  // Group refs — each part starts with scale.y = 0 (rises from its base)
  const rPlatform  = useRef<THREE.Group>(null);
  const rWBack     = useRef<THREE.Group>(null);
  const rWLeft     = useRef<THREE.Group>(null);
  const rWRight    = useRef<THREE.Group>(null);
  const rWFrL      = useRef<THREE.Group>(null);
  const rWFrR      = useRef<THREE.Group>(null);
  const rGlass     = useRef<THREE.Group>(null);
  const rSlats     = useRef<THREE.Group>(null);
  const rRoof      = useRef<THREE.Group>(null);
  const rLight     = useRef<THREE.PointLight>(null);

  // House dims
  const W = 5.0, D = 3.2, H = 2.4;
  const PT = 0.18; // platform thickness
  const RT = 0.16; // roof thickness

  useEffect(() => {
    // Fade in the grid
    const gridMats = document.querySelectorAll("canvas"); // not ideal but grid is always visible

    const e = "power3.out";
    const rise = (r: React.RefObject<THREE.Group | null>, at: number, dur = 0.6) =>
      tl.to(r.current!.scale, { y: 1, duration: dur, ease: e }, at);

    const tl = gsap.timeline({ delay: 0.2 });

    // ① Platform
    rise(rPlatform, 0.3, 0.45);

    // ② Walls rise — staggered
    rise(rWBack,  0.80);
    rise(rWLeft,  0.92);
    rise(rWRight, 0.97);
    rise(rWFrL,   1.02);
    rise(rWFrR,   1.07);

    // ③ Glass window wall glides in (scale from 0)
    tl.to(rGlass.current!.scale,
      { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.2)" }, 1.65);

    // ④ Wood slats appear
    rise(rSlats, 1.8, 0.5);

    // ⑤ Roof drops from above
    tl.fromTo(rRoof.current!.position, { y: 3.5 },
      { y: 0, duration: 0.6, ease: "power3.out" }, 2.1);

    // ⑥ Interior light powers on — creates glow through glass
    tl.to(rLight.current!, { intensity: 4.5, duration: 1.0, ease: "power2.out" }, 2.45);

    // ⑦ Camera freeze + short hold, then signal done
    tl.call(() => setCameraFree(false), undefined, 2.9);
    tl.to({}, { duration: 0.7 }, 2.9);
    tl.call(onDone, undefined, 3.7);

    return () => { tl.kill(); };
  }, [onDone]);

  // ─── wood slats: vertical strips on the right wall exterior ───
  const SLATS = 8;
  const slatSpacing = D / (SLATS + 1);

  return (
    <>
      <OrbitalCamera paused={!cameraFree} />
      <GlowGrid />
      <GoldParticles />

      {/* ── Ambient — very dark to emphasize the point light drama ── */}
      <ambientLight intensity={0.12} color="#FFF2D8" />

      {/* ── Primary key light — warm sun from upper right ── */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={1.8}
        color="#FFE8C0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* ── Cool rim light from back ── */}
      <directionalLight position={[-6, 6, -8]} intensity={0.5} color="#8BB0FF" />

      {/* ── Interior point light — starts off, glows gold when house is complete ── */}
      <pointLight
        ref={rLight}
        position={[0, 1.4, 0]}
        intensity={0}
        color="#C9A84C"
        distance={8}
        decay={2}
        castShadow
      />

      {/* ── ① FOUNDATION PLATFORM ── */}
      <group ref={rPlatform} position={[0, 0, 0]} scale={[1, 0, 1]}>
        <mesh position={[0, PT / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[W + 0.6, PT, D + 0.6]} />
          <meshStandardMaterial color="#1C1A17" roughness={0.85} metalness={0.05} />
        </mesh>
        {/* Edge accent strip */}
        <mesh position={[0, PT + 0.008, 0]}>
          <boxGeometry args={[W + 0.62, 0.016, D + 0.62]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* ── ② BACK WALL ── */}
      <group ref={rWBack} position={[0, PT, -(D / 2)]} scale={[1, 0, 1]}>
        <mesh position={[0, H / 2, 0]} castShadow>
          <boxGeometry args={[W, H, 0.1]} />
          <meshStandardMaterial color="#1A1917" roughness={0.82} />
        </mesh>
      </group>

      {/* ── ③ LEFT WALL ── */}
      <group ref={rWLeft} position={[-(W / 2), PT, 0]} scale={[1, 0, 1]}>
        <mesh position={[0, H / 2, 0]} castShadow>
          <boxGeometry args={[0.1, H, D]} />
          <meshStandardMaterial color="#1A1917" roughness={0.82} />
        </mesh>
      </group>

      {/* ── ④ RIGHT WALL (back section — wood slats on exterior) ── */}
      <group ref={rWRight} position={[W / 2, PT, 0]} scale={[1, 0, 1]}>
        <mesh position={[0, H / 2, 0]} castShadow>
          <boxGeometry args={[0.1, H, D]} />
          <meshStandardMaterial color="#1A1917" roughness={0.82} />
        </mesh>
      </group>

      {/* ── ⑤ FRONT WALL — left solid section ── */}
      <group ref={rWFrL} position={[-(W / 2) + 0.65, PT, D / 2]} scale={[1, 0, 1]}>
        <mesh position={[0, H / 2, 0]} castShadow>
          <boxGeometry args={[1.2, H, 0.1]} />
          <meshStandardMaterial color="#1A1917" roughness={0.82} />
        </mesh>
      </group>

      {/* ── ⑥ FRONT WALL — right solid section ── */}
      <group ref={rWFrR} position={[(W / 2) - 0.55, PT, D / 2]} scale={[1, 0, 1]}>
        <mesh position={[0, H / 2, 0]} castShadow>
          <boxGeometry args={[1.0, H, 0.1]} />
          <meshStandardMaterial color="#1A1917" roughness={0.82} />
        </mesh>
      </group>

      {/* ── ⑦ GLASS WINDOW WALL — glows gold when interior light powers on ── */}
      <group
        ref={rGlass}
        position={[0.1, PT, D / 2]}
        scale={[0, 0, 0]}
      >
        {/* Outer frame */}
        <mesh position={[0, H / 2, 0]}>
          <boxGeometry args={[2.6, H, 0.08]} />
          <meshStandardMaterial color="#2A2825" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Glass — transparent with warm emissive glow */}
        <mesh position={[0, H / 2, 0.05]}>
          <boxGeometry args={[2.48, H - 0.1, 0.02]} />
          <meshStandardMaterial
            color="#C9A84C"
            emissive="#C9A84C"
            emissiveIntensity={0.06}
            transparent
            opacity={0.18}
            roughness={0.05}
            metalness={0.3}
          />
        </mesh>
        {/* Thin cross dividers */}
        <mesh position={[0, H / 2, 0.06]}>
          <boxGeometry args={[2.48, 0.04, 0.025]} />
          <meshStandardMaterial color="#3A3835" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0.4, H / 2, 0.06]}>
          <boxGeometry args={[0.04, H - 0.1, 0.025]} />
          <meshStandardMaterial color="#3A3835" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[-0.85, H / 2, 0.06]}>
          <boxGeometry args={[0.04, H - 0.1, 0.025]} />
          <meshStandardMaterial color="#3A3835" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      {/* ── ⑧ WOOD SLATS — vertical strips on right exterior wall ── */}
      <group ref={rSlats} position={[W / 2 + 0.06, PT, 0]} scale={[1, 0, 1]}>
        {Array.from({ length: SLATS }).map((_, i) => (
          <mesh
            key={i}
            position={[0, H / 2, -D / 2 + slatSpacing * (i + 1)]}
            castShadow
          >
            <boxGeometry args={[0.06, H, 0.18]} />
            <meshStandardMaterial color="#3D2A1A" roughness={0.92} />
          </mesh>
        ))}
      </group>

      {/* ── ⑨ FLAT ROOF — drops in from above ── */}
      <group ref={rRoof} position={[0, 0, 0]}>
        {/* Main dark slab */}
        <mesh position={[0, PT + H + RT / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[W + 0.6, RT, D + 0.6]} />
          <meshStandardMaterial color="#0E0D0B" roughness={0.55} metalness={0.1} />
        </mesh>
        {/* Gold accent edge line under roof (front) */}
        <mesh position={[0, PT + H, D / 2 + 0.32]}>
          <boxGeometry args={[W + 0.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.6} />
        </mesh>
        {/* Roof top minimal parapet */}
        <mesh position={[0, PT + H + RT + 0.05, D / 2 + 0.28]}>
          <boxGeometry args={[W + 0.6, 0.1, 0.06]} />
          <meshStandardMaterial color="#161513" metalness={0.15} roughness={0.5} />
        </mesh>
      </group>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRELOADER WRAPPER — full-screen overlay with 3D scene
   ───────────────────────────────────────────────────────────── */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  const handleDone = () => {
    setExiting(true);
    setTimeout(onDone, 900);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#080706",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
        >
          {/* ── 3D Canvas ── */}
          <div style={{ width: "100vw", height: "100vh", position: "absolute", inset: 0 }}>
            <Canvas
              shadows
              frameloop="always"
              gl={{ antialias: true, alpha: false }}
              style={{ width: "100%", height: "100%", background: "#080706" }}
            >
              <fog attach="fog" args={["#080706", 14, 28]} />
              <color attach="background" args={["#080706"]} />
              <Suspense fallback={null}>
                <HouseScene onDone={handleDone} />
              </Suspense>
            </Canvas>
          </div>

          {/* ── Vignette overlay ── */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }} />

          {/* ── Brand identity — bottom center ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.0 }}
            style={{
              position: "absolute", bottom: "7vh",
              textAlign: "center", zIndex: 10,
            }}
          >
            <div style={{
              fontSize: "clamp(18px, 2.5vw, 26px)",
              fontWeight: 800,
              letterSpacing: "0.12em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "10px",
            }}>
              חידוש מבנים
            </div>
            <div style={{
              width: "140px", height: "1px", margin: "0 auto 10px",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
            }} />
            <div style={{
              fontSize: "10px", letterSpacing: "5px", color: "#6B6762",
              textTransform: "uppercase",
            }}>
              בנייה פרימיום
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";
import React, { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   BLUEPRINT GRID — fades in at the very start
   ───────────────────────────────────────────── */
function Blueprint({ visible }: { visible: boolean }) {
  const ref = useRef<THREE.GridHelper>(null);
  useEffect(() => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.LineBasicMaterial;
    mat.transparent = true;
    mat.opacity = 0;
    if (visible) gsap.to(mat, { opacity: 0.45, duration: 0.7, ease: "power2.out" });
    else         gsap.to(mat, { opacity: 0,    duration: 0.5 });
  }, [visible]);
  return (
    <gridHelper
      ref={ref}
      args={[20, 40, "#6B8EC8", "#6B8EC8"]}
      position={[0, 0.002, 0]}
    />
  );
}

/* ─────────────────────────────────────────────
   LAWN — soft green ground plane
   ───────────────────────────────────────────── */
function Lawn() {
  return (
    <>
      {/* main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#D8E8C8" roughness={1} />
      </mesh>
      {/* stone path strip in front of house */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 3.4]} receiveShadow>
        <planeGeometry args={[5, 2.5]} />
        <meshStandardMaterial color="#D4CECC" roughness={0.95} />
      </mesh>
    </>
  );
}

/* ─────────────────────────────────────────────
   CAMERA — cinematic 3/4 angle, slow orbit
   ───────────────────────────────────────────── */
function SceneCamera({ orbit }: { orbit: boolean }) {
  const { camera } = useThree();
  const angle = useRef(0.42);

  useEffect(() => {
    (camera as THREE.PerspectiveCamera).fov = 34;
    camera.updateProjectionMatrix();
    camera.position.set(10, 5, 10);
    camera.lookAt(0, 1.2, 0);
  }, [camera]);

  useFrame((_, dt) => {
    if (!orbit) return;
    angle.current += dt * 0.1;
    const r = 11;
    camera.position.x = Math.sin(angle.current) * r;
    camera.position.z = Math.cos(angle.current) * r;
    camera.position.y = 4.5 + Math.sin(angle.current * 0.3) * 0.4;
    camera.lookAt(0, 1.2, 0);
  });

  return null;
}

/* ─────────────────────────────────────────────
   HOUSE SCENE — premium white modern villa
   ───────────────────────────────────────────── */
function HouseScene({ onDone }: { onDone: () => void }) {
  const [showGrid, setShowGrid]   = useState(false);
  const [orbitCam, setOrbitCam]   = useState(false);

  /* --- group refs (all start scale.y=0, rise from base) --- */
  const rFoundation = useRef<THREE.Group>(null);
  // main block walls
  const rWallBack   = useRef<THREE.Group>(null);
  const rWallLeft   = useRef<THREE.Group>(null);
  const rWallRight  = useRef<THREE.Group>(null);
  const rWallFrL    = useRef<THREE.Group>(null); // front-left solid
  const rWallFrR    = useRef<THREE.Group>(null); // front-right solid
  // glass + frames
  const rGlass      = useRef<THREE.Group>(null);
  // wood panels
  const rWood       = useRef<THREE.Group>(null);
  // main roof
  const rRoof       = useRef<THREE.Group>(null);
  // side wing
  const rWing       = useRef<THREE.Group>(null);
  // entrance canopy
  const rCanopy     = useRef<THREE.Group>(null);
  // landscaping shrubs
  const rShrubs     = useRef<THREE.Group>(null);

  /* --- dimensions --- */
  const W = 5.6, D = 3.0, H = 2.2;   // main block
  const WW = 3.2, WD = 2.6, WH = 1.7; // right wing
  const PT = 0.15;                     // platform thickness
  const RT = 0.14;                     // roof thickness
  const OH = 0.55;                     // roof overhang

  /* --- window wall glass area: x from -1.4 to 1.4, full height --- */
  const GW = 2.8; // glass panel width

  useEffect(() => {
    /* helpers */
    const rise = (r: React.RefObject<THREE.Group | null>, at: number, dur = 0.55, ease = "power3.out") =>
      tl.to(r.current!.scale, { y: 1, duration: dur, ease }, at);
    const drop = (r: React.RefObject<THREE.Group | null>, fromY: number, at: number) => {
      tl.set(r.current!, { visible: true });
      tl.fromTo(r.current!.position, { y: fromY }, { y: 0, duration: 0.55, ease: "power3.out" }, at);
    };

    const tl = gsap.timeline({ delay: 0.1 });

    // ① Blueprint grid appears
    tl.call(() => setShowGrid(true), undefined, 0.0);
    tl.call(() => setOrbitCam(true), undefined, 0.1);

    // ② Foundation
    rise(rFoundation, 0.4, 0.4);

    // ③ Main block walls rise (tight stagger)
    rise(rWallBack,  0.9);
    rise(rWallLeft,  1.0);
    rise(rWallRight, 1.05);
    rise(rWallFrL,   1.1);
    rise(rWallFrR,   1.15);

    // ④ Side wing rises
    rise(rWing, 1.2, 0.55);

    // ⑤ Glass window wall slides in
    tl.to(rGlass.current!.scale, { x: 1, y: 1, z: 1, duration: 0.45, ease: "back.out(1.3)" }, 1.75);

    // ⑥ Wood panels rise
    rise(rWood, 1.9, 0.45);

    // ⑦ Roof drops in
    drop(rRoof, 3.2, 2.2);

    // ⑧ Entrance canopy drops
    drop(rCanopy, 2.5, 2.55);

    // ⑨ Landscaping pops in
    tl.to(rShrubs.current!.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.6)" }, 2.75);

    // ⑩ Hold then finish
    tl.to({}, { duration: 0.9 }, 3.2);
    tl.call(() => setShowGrid(false), undefined, 3.5);
    tl.call(onDone, undefined, 4.2);

    return () => { tl.kill(); };
  }, [onDone]);

  /* --- shared materials --- */
  const wallMat  = <meshStandardMaterial color="#EDEAE4" roughness={0.88} />;
  const frameMat = <meshStandardMaterial color="#18171A" roughness={0.55} metalness={0.25} />;
  const glassMat = <meshStandardMaterial color="#B8D8F0" transparent opacity={0.22} roughness={0.04} metalness={0.15} />;
  const concMat  = <meshStandardMaterial color="#C8C5C0" roughness={0.9} />;
  const roofMat  = <meshStandardMaterial color="#D8D5CF" roughness={0.82} />;
  const woodMat  = <meshStandardMaterial color="#6B4A30" roughness={0.88} />;
  const wingMat  = <meshStandardMaterial color="#E8E5DE" roughness={0.87} />;

  /* --- helper: a box whose local origin is at its bottom face --- */
  const B = ({
    pos, size, mat, ry = 0,
  }: { pos: [number,number,number]; size: [number,number,number]; mat: React.ReactElement; ry?: number }) => (
    <mesh position={pos} rotation={[0, ry, 0]} castShadow receiveShadow>
      <boxGeometry args={size} />
      {mat}
    </mesh>
  );

  const SLAT_COUNT = 6;
  const wingX = W / 2 + WW / 2 + 0.02;

  return (
    <>
      <SceneCamera orbit={orbitCam} />
      <Lawn />
      <Blueprint visible={showGrid} />

      {/* ── LIGHTING ── */}
      <ambientLight intensity={0.65} color="#FFF8F0" />
      {/* warm sun from upper-right */}
      <directionalLight position={[8, 10, 5]} intensity={2.2} color="#FFFBF0"
        castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-near={0.5} shadow-camera-far={50}
        shadow-camera-left={-14} shadow-camera-right={14}
        shadow-camera-top={14} shadow-camera-bottom={-14}
      />
      {/* cool fill from left */}
      <directionalLight position={[-6, 5, 4]} intensity={0.5} color="#D0E8FF" />
      {/* gentle bounce from below */}
      <hemisphereLight args={["#C8E0FF", "#D8EACC", 0.35]} />

      {/* ── ① FOUNDATION ── */}
      <group ref={rFoundation} position={[0, 0, 0]} scale={[1, 0, 1]}>
        <B pos={[0, PT / 2, 0]}                       size={[W + 0.4, PT, D + 0.4]}    mat={concMat} />
        <B pos={[wingX, PT / 2, -(D - WD) / 2 + 0.1]} size={[WW + 0.3, PT, WD + 0.3]} mat={concMat} />
      </group>

      {/* ── ② MAIN BLOCK WALLS ── */}
      {/* Back wall */}
      <group ref={rWallBack} position={[0, PT, -D / 2]} scale={[1, 0, 1]}>
        <B pos={[0, H / 2, 0]} size={[W, H, 0.1]} mat={wallMat} />
      </group>
      {/* Left wall */}
      <group ref={rWallLeft} position={[-W / 2, PT, 0]} scale={[1, 0, 1]}>
        <B pos={[0, H / 2, 0]} size={[0.1, H, D]} mat={wallMat} />
      </group>
      {/* Right wall (between main + wing, partial) */}
      <group ref={rWallRight} position={[W / 2, PT, -(D - WD) / 2 - 0.1]} scale={[1, 0, 1]}>
        <B pos={[0, H / 2, 0]} size={[0.1, H, WD + 0.2]} mat={wallMat} />
      </group>
      {/* Front wall — left solid strip */}
      <group ref={rWallFrL} position={[-W / 2 + 0.65, PT, D / 2]} scale={[1, 0, 1]}>
        <B pos={[0, H / 2, 0]} size={[1.2, H, 0.1]} mat={wallMat} />
      </group>
      {/* Front wall — right solid strip */}
      <group ref={rWallFrR} position={[W / 2 - 0.5, PT, D / 2]} scale={[1, 0, 1]}>
        <B pos={[0, H / 2, 0]} size={[0.9, H, 0.1]} mat={wallMat} />
      </group>

      {/* ── ③ SIDE WING (lower, right) ── */}
      <group ref={rWing} position={[wingX, PT, -(D - WD) / 2]} scale={[1, 0, 1]}>
        {/* back */}
        <B pos={[0, WH / 2, -WD / 2]}    size={[WW, WH, 0.1]} mat={wingMat} />
        {/* right */}
        <B pos={[WW / 2, WH / 2, 0]}     size={[0.1, WH, WD]} mat={wingMat} />
        {/* front solid parts */}
        <B pos={[-WW / 2 + 0.5, WH / 2, WD / 2]}  size={[0.9, WH, 0.1]} mat={wingMat} />
        <B pos={[WW / 2 - 0.45, WH / 2, WD / 2]}  size={[0.8, WH, 0.1]} mat={wingMat} />
        {/* wing glass */}
        <B pos={[0.15, WH / 2, WD / 2 + 0.02]}    size={[1.2, WH - 0.1, 0.025]} mat={glassMat} />
        {/* wing glass frames */}
        <B pos={[0.15, WH / 2, WD / 2 + 0.04]}    size={[1.2, 0.04, 0.04]} mat={frameMat} />
        <B pos={[0.15, WH - 0.05, WD / 2 + 0.04]} size={[1.2, 0.04, 0.04]} mat={frameMat} />
        <B pos={[0.15, 0.05, WD / 2 + 0.04]}       size={[1.2, 0.04, 0.04]} mat={frameMat} />
        {/* wing roof */}
        <B pos={[0, WH + RT / 2, 0]}              size={[WW + 0.3, RT, WD + 0.3]} mat={roofMat} />
      </group>

      {/* ── ④ MAIN GLASS WINDOW WALL ── */}
      <group ref={rGlass} position={[-0.15, PT, D / 2]} scale={[0, 0, 0]}>
        {/* glass panes (3 panels) */}
        <B pos={[-0.95, H / 2, 0.02]} size={[0.9, H - 0.1, 0.02]} mat={glassMat} />
        <B pos={[0.05,  H / 2, 0.02]} size={[0.9, H - 0.1, 0.02]} mat={glassMat} />
        <B pos={[1.05,  H / 2, 0.02]} size={[0.9, H - 0.1, 0.02]} mat={glassMat} />
        {/* black metal frames — horizontal */}
        {[0.05, H - 0.05, H / 2].map((y, i) => (
          <B key={i} pos={[0.05, y, 0.04]} size={[GW + 0.05, 0.05, 0.05]} mat={frameMat} />
        ))}
        {/* black metal frames — vertical dividers */}
        {[-0.5, 0.55, -1.4, 1.55].map((x, i) => (
          <B key={i} pos={[x, H / 2, 0.04]} size={[0.05, H, 0.05]} mat={frameMat} />
        ))}
        {/* thin horizontal rail at mid-height */}
        <B pos={[0.05, H * 0.38, 0.04]} size={[GW + 0.05, 0.03, 0.03]} mat={frameMat} />
      </group>

      {/* ── ⑤ WOOD PANELS — vertical slats on left wall exterior ── */}
      <group ref={rWood} position={[-W / 2 - 0.06, PT, 0]} scale={[1, 0, 1]}>
        {Array.from({ length: SLAT_COUNT }).map((_, i) => {
          const z = -D / 2 + 0.3 + i * ((D - 0.6) / (SLAT_COUNT - 1));
          return (
            <mesh key={i} position={[0, H / 2, z]} castShadow>
              <boxGeometry args={[0.06, H, 0.22]} />
              {woodMat}
            </mesh>
          );
        })}
      </group>

      {/* ── ⑥ MAIN FLAT ROOF — drops from above ── */}
      <group ref={rRoof} position={[0, 0, 0]}>
        <B pos={[0, PT + H + RT / 2, 0]}
           size={[W + OH * 2, RT, D + OH * 2]} mat={roofMat} />
        {/* overhang soffit (underside of overhang — slightly darker) */}
        <mesh position={[0, PT + H, D / 2 + OH / 2 + 0.01]} receiveShadow>
          <boxGeometry args={[W + OH * 2, 0.01, OH]} />
          <meshStandardMaterial color="#C0BDB8" roughness={0.9} />
        </mesh>
        {/* thin black drip edge */}
        <B pos={[0, PT + H + RT + 0.03, D / 2 + OH / 2]}
           size={[W + OH * 2, 0.06, 0.06]} mat={frameMat} />
      </group>

      {/* ── ⑦ ENTRANCE CANOPY — thin slab over front door area ── */}
      <group ref={rCanopy} position={[0, 0, 0]}>
        <B pos={[-0.15, PT + H * 0.7, D / 2 + 0.65]}
           size={[1.6, 0.06, 1.3]} mat={roofMat} />
        {/* canopy support column */}
        <B pos={[-0.15, PT + H * 0.35, D / 2 + 1.2]}
           size={[0.08, H * 0.7, 0.08]} mat={frameMat} />
      </group>

      {/* ── ⑧ LANDSCAPING — simple shrubs ── */}
      <group ref={rShrubs} scale={[0, 0, 0]}>
        {/* hedge along left wall */}
        {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
          <mesh key={i} position={[-W / 2 - 0.5, 0.25, z]} castShadow>
            <boxGeometry args={[0.6, 0.5, 0.5]} />
            <meshStandardMaterial color="#5A7A40" roughness={0.95} />
          </mesh>
        ))}
        {/* low shrub front-right */}
        <mesh position={[W / 2 + WW / 2 + 0.8, 0.18, D / 2 + 0.9]} castShadow>
          <sphereGeometry args={[0.4, 8, 6]} />
          <meshStandardMaterial color="#6A8A4A" roughness={0.95} />
        </mesh>
        <mesh position={[W / 2 + WW / 2 + 1.5, 0.22, D / 2 + 0.5]} castShadow>
          <sphereGeometry args={[0.5, 8, 6]} />
          <meshStandardMaterial color="#58784A" roughness={0.95} />
        </mesh>
        {/* tree left */}
        <group position={[-W / 2 - 2.2, 0, -0.5]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 1.0, 8]} />
            <meshStandardMaterial color="#4A3020" roughness={0.95} />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.85, 10, 8]} />
            <meshStandardMaterial color="#4A7030" roughness={0.95} />
          </mesh>
        </group>
      </group>
    </>
  );
}

/* ─────────────────────────────────────────────
   PRELOADER WRAPPER
   ───────────────────────────────────────────── */
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
            background: "#F0EDE8",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
        >
          {/* full-screen 3D canvas */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Canvas
              shadows
              frameloop="always"
              gl={{ antialias: true, alpha: false }}
              style={{ width: "100%", height: "100%", background: "#F0EDE8" }}
            >
              <color attach="background" args={["#F0EDE8"]} />
              <Suspense fallback={null}>
                <HouseScene onDone={handleDone} />
              </Suspense>
            </Canvas>
          </div>

          {/* subtle vignette */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, rgba(0,0,0,0.18) 100%)",
          }} />

          {/* brand name — bottom center */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            style={{ position: "absolute", bottom: "6vh", textAlign: "center", zIndex: 10 }}
          >
            <div style={{
              fontSize: "clamp(17px, 2.2vw, 24px)", fontWeight: 800, letterSpacing: "0.12em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              marginBottom: "9px",
            }}>
              חידוש מבנים
            </div>
            <div style={{
              width: "130px", height: "1px", margin: "0 auto 9px",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.55), transparent)",
            }} />
            <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#8A8480", textTransform: "uppercase" }}>
              בנייה פרימיום
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

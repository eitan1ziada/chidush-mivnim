"use client";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────
   CAMERA — 3/4 angle view of the house from front-right
   ───────────────────────────────────────────────────────── */
function SceneCamera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(6, 4, 7);
    (camera as THREE.PerspectiveCamera).fov = 38;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 1.1, 0);
  }, [camera]);
  return null;
}

/* ─────────────────────────────────────────────────────────
   HOUSE SCENE — all geometry + GSAP build timeline
   ───────────────────────────────────────────────────────── */
function HouseScene({ onDone }: { onDone: () => void }) {
  // One group ref per building element
  const refSlab    = useRef<THREE.Group>(null); // concrete foundation
  const refWBack   = useRef<THREE.Group>(null); // back wall
  const refWLeft   = useRef<THREE.Group>(null); // left wall
  const refWRight  = useRef<THREE.Group>(null); // right wall
  const refWFrL    = useRef<THREE.Group>(null); // front wall — left of window
  const refWFrR    = useRef<THREE.Group>(null); // front wall — right of window
  const refWFrTop  = useRef<THREE.Group>(null); // front wall — strip above window
  const refWin     = useRef<THREE.Group>(null); // glass window
  const refWood    = useRef<THREE.Group>(null); // wood accent panel
  const refRoof    = useRef<THREE.Group>(null); // flat roof

  // House measurements (in scene units)
  const W = 4.0, D = 2.6, H = 2.0;
  const FH = 0.12;  // foundation slab height
  const RT = 0.20;  // roof thickness
  const WH = 1.5;   // window height
  const WW = 1.5;   // window width

  useEffect(() => {
    // Animate scale.y from 0→1 on a group whose child is offset by +height/2.
    // The group's Y position is the "ground" of that part, so scaling from
    // y=0 means the element rises from its base — no pivot tricks needed.
    const rise = (ref: React.RefObject<THREE.Group | null>, at: number, dur = 0.55) =>
      tl.to(ref.current!.scale, { y: 1, duration: dur, ease: "power3.out" }, at);

    const tl = gsap.timeline({ delay: 0.1, onComplete: onDone });

    // ① Foundation slab rises
    rise(refSlab, 0.3, 0.4);

    // ② Walls rise in sequence (back first, then sides, then front sections)
    rise(refWBack,  0.75);
    rise(refWLeft,  0.85);
    rise(refWRight, 0.90);
    rise(refWFrL,   0.95);
    rise(refWFrR,   1.00);
    rise(refWFrTop, 1.05, 0.35);

    // ③ Glass window slides in (scale x+y from 0)
    tl.to(refWin.current!.scale,
      { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(1.4)" }, 1.55);

    // ④ Wood accent panel rises
    rise(refWood, 1.7, 0.4);

    // ⑤ Roof drops in from above + fades
    tl.fromTo(refRoof.current!.position,
      { y: 3.0 },
      { y: 0, duration: 0.55, ease: "power3.out" }, 2.05);

    // Hold 0.5 s at the end, then signal done
    tl.to({}, { duration: 0.5 }, 2.8);

    return () => { tl.kill(); };
  }, [onDone]);

  // ── Shared material colors ──
  const MAT = {
    concrete : { color: "#C4C1BC", roughness: 0.92 },
    wall     : { color: "#ECEAE4", roughness: 0.88 },
    roof     : { color: "#252320", roughness: 0.65, metalness: 0.06 },
    wood     : { color: "#7B5C42", roughness: 0.9  },
    glassF   : { color: "#D4E6F0", roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.28 },
  };

  // Helper: standard mat JSX (no hooks, plain props)
  const Mat = ({ c }: { c: typeof MAT[keyof typeof MAT] }) => (
    <meshStandardMaterial
      color={c.color}
      roughness={c.roughness}
      metalness={"metalness" in c ? (c as { metalness: number }).metalness : 0}
      transparent={"transparent" in c ? (c as { transparent: boolean }).transparent : false}
      opacity={"opacity" in c ? (c as { opacity: number }).opacity : 1}
    />
  );

  // Helper: a mesh whose local origin is at its bottom face
  // placed inside a group; animating group.scale.y creates "rise from base"
  const Slab = ({
    gRef, gPos, size, mat, meshY,
  }: {
    gRef: React.RefObject<THREE.Group | null>;
    gPos: [number,number,number];
    size: [number,number,number];
    mat: typeof MAT[keyof typeof MAT];
    meshY?: number;
  }) => (
    <group ref={gRef} position={gPos} scale={[1, 0, 1]}>
      <mesh
        position={[0, meshY ?? size[1] / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={size} />
        <Mat c={mat} />
      </mesh>
    </group>
  );

  return (
    <>
      {/* Background color */}
      <color attach="background" args={["#F5F2ED"]} />

      {/* ── LIGHTING ── */}
      {/* Soft ambient to prevent pitch-black shadows */}
      <ambientLight intensity={0.75} color="#FFF8F0" />
      {/* Primary sun — upper right front */}
      <directionalLight
        position={[7, 9, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      {/* Fill light — opposite side, softer */}
      <directionalLight position={[-4, 5, -3]} intensity={0.4} color="#E8F0FF" />
      {/* Sky / ground hemisphere */}
      <hemisphereLight args={["#D6E8FF", "#F0EDE6", 0.45]} />

      {/* ── GROUND PLANE ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#EDE9E2" roughness={1} />
      </mesh>

      {/* Subtle ground grid — blueprint feel */}
      <gridHelper
        args={[12, 24, "#B8B0A4", "#D0CCC5"]}
        position={[0, 0.001, 0]}
      />

      {/* ── ① FOUNDATION SLAB ── */}
      <Slab
        gRef={refSlab}
        gPos={[0, 0, 0]}
        size={[W + 0.5, FH, D + 0.5]}
        mat={MAT.concrete}
      />

      {/* ── ② BACK WALL ── */}
      <Slab
        gRef={refWBack}
        gPos={[0, FH, -(D / 2)]}
        size={[W, H, 0.09]}
        mat={MAT.wall}
      />

      {/* ── ③ LEFT WALL ── */}
      <Slab
        gRef={refWLeft}
        gPos={[-(W / 2), FH, 0]}
        size={[0.09, H, D]}
        mat={MAT.wall}
      />

      {/* ── ④ RIGHT WALL ── */}
      <Slab
        gRef={refWRight}
        gPos={[W / 2, FH, 0]}
        size={[0.09, H, D]}
        mat={MAT.wall}
      />

      {/* ── ⑤ FRONT WALL — LEFT SECTION (solid, left of window) ── */}
      {/* Window spans x: -0.5 → +1.0 roughly, so left section: x=-2→-0.5 */}
      <Slab
        gRef={refWFrL}
        gPos={[-1.375, FH, D / 2]}
        size={[1.25, H, 0.09]}
        mat={MAT.wall}
      />

      {/* ── ⑥ FRONT WALL — RIGHT SECTION ── */}
      <Slab
        gRef={refWFrR}
        gPos={[1.5, FH, D / 2]}
        size={[1.0, H, 0.09]}
        mat={MAT.wall}
      />

      {/* ── ⑦ FRONT WALL — TOP STRIP above window ── */}
      <Slab
        gRef={refWFrTop}
        gPos={[0.25, FH + H - 0.35, D / 2]}
        size={[WW + 0.1, 0.35, 0.09]}
        mat={MAT.wall}
        meshY={0.175}
      />

      {/* ── ⑧ GLASS WINDOW — slides in from center ── */}
      {/* Positioned at centre of the front-wall opening */}
      <group
        ref={refWin}
        position={[0.25, FH + (H - WH) / 2, D / 2]}
        scale={[0, 0, 0]}
      >
        {/* Slim window frame */}
        <mesh position={[0, WH / 2, 0]} castShadow>
          <boxGeometry args={[WW, WH, 0.06]} />
          <meshStandardMaterial color="#D8D5CF" roughness={0.7} />
        </mesh>
        {/* Glass pane — slightly in front of frame */}
        <mesh position={[0, WH / 2, 0.04]}>
          <boxGeometry args={[WW - 0.08, WH - 0.08, 0.02]} />
          <meshStandardMaterial
            color="#C2DCF0"
            transparent
            opacity={0.28}
            roughness={0.05}
            metalness={0.12}
          />
        </mesh>
        {/* Thin horizontal divider bar */}
        <mesh position={[0, WH / 2, 0.05]}>
          <boxGeometry args={[WW - 0.08, 0.025, 0.025]} />
          <meshStandardMaterial color="#C8C5BF" roughness={0.6} />
        </mesh>
      </group>

      {/* ── ⑨ WOOD ACCENT PANEL — left exterior wall ── */}
      <Slab
        gRef={refWood}
        gPos={[-(W / 2) - 0.02, FH, 0.5]}
        size={[0.07, 1.3, 1.0]}
        mat={MAT.wood}
      />

      {/* ── ⑩ FLAT ROOF — drops in from above ── */}
      <group ref={refRoof} position={[0, 0, 0]}>
        {/* Main roof slab */}
        <mesh position={[0, FH + H + RT / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[W + 0.5, RT, D + 0.5]} />
          <meshStandardMaterial color="#252320" roughness={0.62} metalness={0.06} />
        </mesh>
        {/* Thin overhang shadow line under front edge */}
        <mesh position={[0, FH + H - 0.01, D / 2 + 0.26]}>
          <boxGeometry args={[W + 0.5, 0.03, 0.04]} />
          <meshStandardMaterial color="#151412" />
        </mesh>
        {/* Roof-top railing hint — front edge */}
        <mesh position={[0, FH + H + RT + 0.04, D / 2 + 0.22]}>
          <boxGeometry args={[W + 0.5, 0.08, 0.04]} />
          <meshStandardMaterial color="#3A3835" roughness={0.5} metalness={0.1} />
        </mesh>
      </group>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   PRELOADER — wraps the 3D scene with fade-out overlay
   ───────────────────────────────────────────────────────── */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  const handleDone = () => {
    setExiting(true);
    setTimeout(onDone, 750);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#F5F2ED",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
        >
          {/* 3-D canvas — responsive size */}
          <div style={{
            width: "min(92vw, 640px)",
            height: "min(55vw, 420px)",
            borderRadius: "4px",
            overflow: "hidden",
          }}>
            <Canvas
              shadows
              frameloop="always"
              gl={{ antialias: true, alpha: false }}
              style={{ width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <SceneCamera />
                <HouseScene onDone={handleDone} />
              </Suspense>
            </Canvas>
          </div>

          {/* Brand identity below canvas */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{ textAlign: "center", marginTop: "22px" }}
          >
            <div style={{
              fontSize: "19px", fontWeight: 800, letterSpacing: "0.06em",
              background: "linear-gradient(135deg, #9A7A2E, #C9A84C, #E8C97A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              חידוש מבנים
            </div>
            <div style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
              margin: "7px auto",
              width: "120px",
            }} />
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#9A9590", textTransform: "uppercase" }}>
              בנייה פרימיום
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

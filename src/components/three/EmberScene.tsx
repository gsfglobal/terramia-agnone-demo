"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Utility: random deterministico per avere sempre la stessa scena     */
/* ------------------------------------------------------------------ */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* Carboni: InstancedMesh con shader procedurale (crepe incandescenti) */
/* ------------------------------------------------------------------ */
const coalVertex = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vSeed;
  varying float vDepth;
  void main() {
    mat4 m = modelMatrix * instanceMatrix;
    vec4 wp = m * vec4(position, 1.0);
    vWorld = wp.xyz;
    vNormal = normalize(mat3(m) * normal);
    vSeed = instanceMatrix[3].x * 13.17 + instanceMatrix[3].z * 7.73;
    vec4 mv = viewMatrix * wp;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const coalFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uFog;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vSeed;
  varying float vDepth;

  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.07; a *= 0.5; } return v; }

  void main() {
    vec3 n = normalize(vNormal);
    float t = uTime;
    float pattern = fbm(vWorld * 11.0 + vec3(0.0, t * 0.08, t * 0.05));
    float cracks = smoothstep(0.52, 0.72, pattern);
    float breathe = 0.55 + 0.45 * sin(t * 0.9 + vSeed) * sin(t * 0.37 + vSeed * 0.5);
    float under = clamp(0.35 - n.y * 0.65, 0.0, 1.0);
    float heat = smoothstep(0.55, 0.0, vWorld.y) * (0.65 + 0.35 * fbm(vWorld * 1.3 + t * 0.05));

    vec3 charcoal = vec3(0.035, 0.03, 0.028);
    float ash = smoothstep(0.55, 0.95, n.y) * smoothstep(0.35, 0.8, fbm(vWorld * 11.0));
    charcoal = mix(charcoal, vec3(0.22, 0.2, 0.19), ash * 0.55);

    vec3 lightDir = normalize(vec3(-0.4, 0.8, 0.5));
    float diff = 0.25 + 0.75 * max(dot(n, lightDir), 0.0);
    vec3 col = charcoal * diff;

    float glow = (cracks * (0.55 + 0.9 * under) + under * 0.35) * breathe * heat;
    vec3 emberDeep = vec3(0.85, 0.12, 0.01);
    vec3 emberHot = vec3(1.0, 0.62, 0.22);
    vec3 ember = mix(emberDeep, emberHot, clamp(cracks * breathe * 1.2, 0.0, 1.0));
    col += ember * glow * 3.2;

    float fogF = smoothstep(5.5, 13.0, vDepth);
    col = mix(col, uFog, fogF);
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Coals({ count = 520 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: coalVertex,
        fragmentShader: coalFragment,
        uniforms: { uTime: { value: 0 }, uFog: { value: new THREE.Color("#120f0d") } },
      }),
    [],
  );

  const geometry = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 1);
    const p = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const d = 1 + 0.22 * Math.sin(v.x * 5.1) * Math.cos(v.y * 4.3 + v.z * 3.7) + 0.12 * Math.sin(v.z * 9.0);
      v.multiplyScalar(d);
      v.y *= 0.62;
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useEffect(() => {
    const rand = mulberry32(7);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const s = new THREE.Vector3();
    const pos = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      // distribuzione ellittica, più densa al centro
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      pos.set(Math.cos(a) * r * 4.6, 0, Math.sin(a) * r * 2.5);
      const layer = rand();
      pos.y = layer * 0.32 * (1 - r * 0.6) - 0.05;
      e.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
      q.setFromEuler(e);
      const sc = 0.055 + rand() * 0.11;
      s.set(sc * (0.9 + rand() * 0.5), sc, sc * (0.9 + rand() * 0.5));
      m.compose(pos, q, s);
      mesh.current?.setMatrixAt(i, m);
    }
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <instancedMesh ref={mesh} args={[geometry, material, count]} frustumCulled={false} />;
}

/* ------------------------------------------------------------------ */
/* Griglia in ferro                                                     */
/* ------------------------------------------------------------------ */
function Grate() {
  const bars = useMemo(() => Array.from({ length: 23 }, (_, i) => -2.0 + i * 0.18), []);
  return (
    <group position={[0, 0.62, 0]}>
      {bars.map((z) => (
        <mesh key={z} position={[0.4, 0, z * 0.62]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 5.4, 8]} />
          <meshStandardMaterial color="#2b2420" metalness={0.9} roughness={0.38} />
        </mesh>
      ))}
      {[-2.1, 2.9].map((x) => (
        <mesh key={x} position={[x, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.8, 8]} />
          <meshStandardMaterial color="#231d1a" metalness={0.85} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Taglio di carne: geometria estrusa + texture procedurale            */
/* ------------------------------------------------------------------ */
function makeCrustTexture(withMarks: boolean) {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const rand = mulberry32(withMarks ? 11 : 23);
  const g = ctx.createRadialGradient(size * 0.5, size * 0.45, 40, size * 0.5, size * 0.5, size * 0.7);
  g.addColorStop(0, "#82321b");
  g.addColorStop(0.55, "#6a2814");
  g.addColorStop(1, "#3d150a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  // macchie di caramellizzazione
  for (let i = 0; i < 1400; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 1 + rand() * 9;
    const tones = ["#1e0a05", "#9a4524", "#b4612f", "#3d1409", "#74301a", "#c2753c"];
    ctx.globalAlpha = 0.1 + rand() * 0.25;
    ctx.fillStyle = tones[Math.floor(rand() * tones.length)];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // marezzatura (grasso)
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#d9a57a";
  for (let i = 0; i < 6; i++) {
    ctx.lineWidth = 2 + rand() * 4;
    ctx.beginPath();
    let x = rand() * size;
    let y = rand() * size;
    ctx.moveTo(x, y);
    for (let k = 0; k < 6; k++) {
      x += (rand() - 0.5) * 90;
      y += (rand() - 0.5) * 90;
      ctx.quadraticCurveTo(x + (rand() - 0.5) * 40, y + (rand() - 0.5) * 40, x, y);
    }
    ctx.stroke();
  }
  // segni della griglia
  if (withMarks) {
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(-0.7);
    for (let k = -3; k <= 3; k++) {
      ctx.filter = "blur(9px)";
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = "#2a0f06";
      ctx.fillRect(-size, k * 105 - 22, size * 2, 44);
      ctx.filter = "blur(3px)";
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "#120603";
      ctx.fillRect(-size, k * 105 - 11, size * 2, 22);
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.repeat.set(0.42, 0.62);
  tex.offset.set(0.5, 0.5);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function Steak() {
  const group = useRef<THREE.Group>(null);
  const { geometry, top, side } = useMemo(() => {
    const s = new THREE.Shape();
    // profilo di un taglio tipo entrecôte
    s.moveTo(-1.15, -0.1);
    s.bezierCurveTo(-1.2, 0.55, -0.55, 0.85, 0.05, 0.72);
    s.bezierCurveTo(0.55, 0.62, 0.8, 0.85, 1.12, 0.48);
    s.bezierCurveTo(1.35, 0.2, 1.25, -0.38, 0.85, -0.6);
    s.bezierCurveTo(0.35, -0.86, -0.2, -0.62, -0.55, -0.72);
    s.bezierCurveTo(-0.95, -0.82, -1.12, -0.55, -1.15, -0.1);
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 6,
      curveSegments: 48,
    });
    geo.center();
    const topMap = makeCrustTexture(true);
    const sideMap = makeCrustTexture(false);
    sideMap.repeat.set(1.6, 1.6);
    const topMat = new THREE.MeshPhysicalMaterial({
      map: topMap,
      bumpMap: topMap,
      bumpScale: 2.2,
      roughness: 0.52,
      clearcoat: 0.28,
      clearcoatRoughness: 0.4,
      sheen: 0.4,
      sheenColor: new THREE.Color("#ffb37a"),
    });
    const sideMat = new THREE.MeshPhysicalMaterial({
      map: sideMap,
      bumpMap: sideMap,
      bumpScale: 2.5,
      roughness: 0.6,
      clearcoat: 0.15,
      color: new THREE.Color("#7a4632"),
    });
    return { geometry: geo, top: topMat, side: sideMat };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -0.35 + Math.sin(t * 0.08) * 0.05;
  });

  return (
    <group ref={group} position={[1.45, 0.74, 0.35]} scale={0.7}>
      <mesh geometry={geometry} material={[top, side]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Fumo: sprite morbidi che salgono lentamente                          */
/* ------------------------------------------------------------------ */
function makeSmokeTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const rand = mulberry32(3);
  for (let i = 0; i < 28; i++) {
    const x = size / 2 + (rand() - 0.5) * size * 0.4;
    const y = size / 2 + (rand() - 0.5) * size * 0.4;
    const r = size * (0.15 + rand() * 0.22);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(255,255,255,0.22)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Smoke({ count = 16 }: { count?: number }) {
  const refs = useRef<THREE.Sprite[]>([]);
  const tex = useMemo(() => makeSmokeTexture(), []);
  const seeds = useMemo(() => {
    const r = mulberry32(42);
    return Array.from({ length: count }, () => ({
      x: (r() - 0.5) * 3.2 + 0.6,
      z: (r() - 0.5) * 1.4,
      speed: 0.12 + r() * 0.12,
      offset: r() * 10,
      rot: (r() - 0.5) * 0.2,
      size: 1.4 + r() * 1.4,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((sp, i) => {
      if (!sp) return;
      const s = seeds[i];
      const life = ((t * s.speed + s.offset) % 1 + 1) % 1; // 0..1
      sp.position.set(s.x + Math.sin(t * 0.3 + i) * 0.25 * life, 0.9 + life * 3.6, s.z - life * 0.6);
      const scale = s.size * (0.6 + life * 1.6);
      sp.scale.set(scale, scale, 1);
      const m = sp.material as THREE.SpriteMaterial;
      m.opacity = Math.sin(life * Math.PI) * 0.16;
      m.rotation += s.rot * 0.01;
    });
  });

  return (
    <group>
      {seeds.map((_, i) => (
        <sprite key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <spriteMaterial map={tex} color="#c9bcae" transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scintille                                                           */
/* ------------------------------------------------------------------ */
function Sparks({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const r = mulberry32(99);
    const positions = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (r() - 0.5) * 5;
      positions[i * 3 + 1] = r() * 3;
      positions[i * 3 + 2] = (r() - 0.5) * 2.5;
      vel[i] = 0.25 + r() * 0.6;
      phase[i] = r() * 6.28;
    }
    return { positions, vel, phase };
  }, [count]);

  useFrame((_, delta) => {
    const p = points.current;
    if (!p) return;
    const arr = p.geometry.attributes.position.array as Float32Array;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += data.vel[i] * dt;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 2 + data.phase[i]) * dt * 0.15;
      if (arr[i * 3 + 1] > 3.6) {
        arr[i * 3 + 1] = 0.2;
        arr[i * 3] = (Math.random() - 0.5) * 5;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      }
    }
    p.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#ffae5c"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Luci della brace con tremolio                                       */
/* ------------------------------------------------------------------ */
function FireLights() {
  const a = useRef<THREE.PointLight>(null);
  const b = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const f = 0.85 + Math.sin(t * 2.1) * 0.06 + Math.sin(t * 5.3) * 0.04 + Math.sin(t * 11.7) * 0.02;
    if (a.current) a.current.intensity = 22 * f;
    if (b.current) b.current.intensity = 10 * (1.9 - f);
  });
  return (
    <>
      <ambientLight intensity={0.06} color="#ffd2a8" />
      <pointLight ref={a} position={[0.6, 0.3, 0.2]} color="#ff6a1c" distance={9} decay={2} />
      <pointLight ref={b} position={[-1.6, 0.35, 0.6]} color="#ff8a3a" distance={7} decay={2} />
      <directionalLight position={[-3, 5, -4]} intensity={0.55} color="#ffe2c4" />
      <SteakKeyLight />
    </>
  );
}

function SteakKeyLight() {
  const light = useRef<THREE.SpotLight>(null);
  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(1.45, 0.74, 0.35);
      light.current.target.updateMatrixWorld();
    }
  }, []);
  return <spotLight ref={light} position={[0.6, 4.2, 2.6]} angle={0.42} penumbra={0.9} intensity={30} decay={1.6} color="#ffd8b4" distance={14} />;
}

/** Fondo del braciere sotto i carboni */
function Bed() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
      <circleGeometry args={[9, 48]} />
      <meshStandardMaterial color="#0d0a08" roughness={1} metalness={0} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Camera: movimento lento + parallasse del mouse + scroll              */
/* ------------------------------------------------------------------ */
function CameraRig({ compact }: { compact: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
    const baseX = compact ? 1.3 : -0.2;
    target.set(
      baseX + Math.sin(t * 0.06) * 0.4 + mouse.current.x * 0.3,
      (compact ? 3.7 : 2.7) + p * 1.4 - mouse.current.y * 0.12,
      (compact ? 5.6 : 5.9) - p * 1.8,
    );
    camera.position.lerp(target, 1 - Math.pow(0.02, delta));
    look.set(compact ? 1.4 : 0.75, (compact ? 0.05 : 0.55) - p * 0.3, 0);
    camera.lookAt(look);
  });
  return null;
}

export default function EmberScene({ compact = false }: { compact?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const invalidateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) invalidateRef.current();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 2.4, 5], fov: compact ? 46 : 38, near: 0.1, far: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        frameloop="always"
        onCreated={({ gl, scene, invalidate }) => {
          scene.background = new THREE.Color("#120f0d");
          scene.fog = new THREE.Fog("#120f0d", 5.5, 13);
          invalidateRef.current = invalidate;
          gl.setClearColor("#120f0d");
        }}
      >
        <PauseWhenHidden visible={visible} />
        <FireLights />
        <Coals count={compact ? 900 : 1800} />
        <Bed />
        <Grate />
        <Steak />
        <Smoke count={compact ? 10 : 16} />
        <Sparks count={compact ? 50 : 90} />
        <CameraRig compact={compact} />
      </Canvas>
    </div>
  );
}

/** Ferma il rendering quando la hero non è visibile (risparmio GPU/batteria) */
function PauseWhenHidden({ visible }: { visible: React.MutableRefObject<boolean> }) {
  const { set } = useThree();
  useFrame(() => {
    if (!visible.current) set({ frameloop: "demand" });
  });
  useEffect(() => {
    const id = window.setInterval(() => {
      if (visible.current) set({ frameloop: "always" });
    }, 300);
    return () => window.clearInterval(id);
  }, [set, visible]);
  return null;
}

"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mountain, Compass, Wind } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Convert Lat/Long on a sphere with radius R to 3D Vector3
function latLongToVector3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

interface TrekPoint {
  id: string;
  name: string;
  region: string;
  altitude: string;
  highlight: string;
  lat: number;
  lon: number;
}

const TREK_HUBS: TrekPoint[] = [
  {
    id: "everest",
    name: "Everest Base Camp",
    region: "Khumbu / Solukhumbu",
    altitude: "8,848m Summit / 5,364m Base Camp",
    highlight: "Top search query in US, UK & Australia",
    lat: 28.0,
    lon: 86.9,
  },
  {
    id: "annapurna",
    name: "Annapurna Circuit",
    region: "Gandaki / Mustang",
    altitude: "8,091m Sanctuary / 5,416m Thorong La",
    highlight: "Highest volume commercial trekking route",
    lat: 28.6,
    lon: 83.9,
  },
  {
    id: "langtang",
    name: "Langtang Valley",
    region: "Bagmati / Rasuwa",
    altitude: "7,227m Peak / 3,870m Kyanjin Gompa",
    highlight: "Fastest-growing cultural heritage trek",
    lat: 28.2,
    lon: 85.5,
  },
  {
    id: "kathmandu",
    name: "Kathmandu Valley Hub",
    region: "Capital / Agency HQ",
    altitude: "1,400m Valley",
    highlight: "Central departure hub for 94% of visitors",
    lat: 27.7,
    lon: 85.3,
  },
];

function GlobeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Generate Mountain/Pine Canvas texture
  const earthTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Deep Pine Green base (#2D4A34)
    ctx.fillStyle = "#2D4A34";
    ctx.fillRect(0, 0, 2048, 1024);

    // Subtle grid lines in Mountain gray-blue (#7C8A96)
    ctx.strokeStyle = "rgba(124, 138, 150, 0.25)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 2048; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y < 1024; y += 128) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }

    // Continents in Meadow Green (#7FA05C)
    ctx.fillStyle = "rgba(127, 160, 92, 0.75)";
    // Asia / Himalaya
    ctx.beginPath();
    ctx.ellipse(1500, 420, 260, 180, 0, 0, Math.PI * 2);
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.ellipse(1180, 360, 140, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.ellipse(1150, 600, 170, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(550, 420, 160, 190, 0, 0, Math.PI * 2);
    ctx.ellipse(650, 720, 130, 200, 0, 0, Math.PI * 2);
    ctx.fill();

    // Himalayan snow ridge in Hazy Sky White (#F5F3EF)
    ctx.fillStyle = "#F5F3EF";
    ctx.beginPath();
    ctx.ellipse(1520, 390, 85, 40, -0.2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <group>
      {/* Outer Glow Halo in Hazy Sky White #F5F3EF */}
      <mesh scale={[2.32, 2.32, 2.32]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#F5F3EF"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main Terrestrial Globe (Mountain Gray-Blue #7C8A96 / Pine #2D4A34) */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture || undefined}
          color="#2D4A34"
          roughness={0.8}
          metalness={0.05}
          emissive="#2D4A34"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Atmospheric Mist Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.24, 48, 48]} />
        <meshStandardMaterial
          color="#F5F3EF"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function PinMarker({
  hub,
  active,
  onSelect,
}: {
  hub: TrekPoint;
  active: boolean;
  onSelect: (hub: TrekPoint) => void;
}) {
  const pos = useMemo(() => latLongToVector3(hub.lat, hub.lon, 2.22), [hub.lat, hub.lon]);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={pos}>
      {/* 3D Pin Point in Accent Gold #D9A23B & CTA Orange #DD6B2E */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hub);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[active ? 0.08 : 0.05, 16, 16]} />
        <meshStandardMaterial
          color={active || hovered ? "#DD6B2E" : "#D9A23B"}
          emissive={active || hovered ? "#DD6B2E" : "#D9A23B"}
          emissiveIntensity={1.4}
        />
      </mesh>

      {/* Radar Ring in Water Blue / Meadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.07, 0.12, 24]} />
        <meshBasicMaterial
          color={active ? "#DD6B2E" : "#7FA05C"}
          transparent
          opacity={active ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Interactive 3D Label: White background with Pine #2D4A34 text */}
      <Html
        position={[0, 0.18, 0]}
        center
        distanceFactor={6}
        className="pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={() => onSelect(hub)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-md transition-all duration-200 backdrop-blur-md cursor-pointer whitespace-nowrap border ${
            active || hovered
              ? "bg-white text-[#2D4A34] border-[#2D4A34] scale-105 shadow-md"
              : "bg-white/95 text-[#2D4A34] border-[#7C8A96]/30 hover:bg-white"
          }`}
        >
          <Mountain className="size-3 text-[#7FA05C]" />
          <span>{hub.name}</span>
        </button>
      </Html>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(2.5, 1.8, 4.4);
    camera.lookAt(0, 0, 0);

    const trigger = ScrollTrigger.create({
      trigger: "#hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        camera.position.x = 2.5 + Math.sin(progress * Math.PI) * 0.8;
        camera.position.y = 1.8 - progress * 0.5;
        camera.position.z = 4.4 - progress * 0.9;
        camera.lookAt(0, 0, 0);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [camera]);

  return null;
}

export default function HeroGlobeScene({
  onSelectHub,
}: {
  onSelectHub?: (hub: TrekPoint) => void;
}) {
  const [selectedHub, setSelectedHub] = useState<TrekPoint>(TREK_HUBS[0]);

  const handleSelect = (hub: TrekPoint) => {
    setSelectedHub(hub);
    if (onSelectHub) onSelectHub(hub);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
      <Canvas
        camera={{ position: [2.5, 1.8, 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.4} color="#F5F3EF" />
        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#F5F3EF" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7FA05C" />

        <CameraRig />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group rotation={[0.2, 0.4, 0]}>
            <GlobeSphere />

            {TREK_HUBS.map((hub) => (
              <PinMarker
                key={hub.id}
                hub={hub}
                active={selectedHub.id === hub.id}
                onSelect={handleSelect}
              />
            ))}
          </group>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>

      {/* Floating Active Hub Card: Deep Pine #2D4A34 with Hazy Sky White #F5F3EF text */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-[#2D4A34]/95 backdrop-blur-md border border-[#7C8A96]/35 rounded-2xl p-4 text-[#F5F3EF] shadow-xl z-10 transition-all duration-300">
        <div className="flex items-center justify-between mb-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D9A23B] bg-[#243c2a] px-2.5 py-0.5 rounded-full border border-[#7C8A96]/30">
            <Compass className="size-3 text-[#7FA05C]" />
            3D Destination Node
          </span>
          <span className="text-xs font-mono font-bold text-[#F5F3EF]">{selectedHub.altitude}</span>
        </div>

        <h4 className="font-heading font-extrabold text-base text-[#F5F3EF] tracking-tight flex items-center gap-1.5">
          <MapPin className="size-4 text-[#7FA05C] shrink-0" />
          {selectedHub.name}
        </h4>

        <p className="text-xs text-[#F5F3EF]/90 mt-1 leading-relaxed font-medium">
          {selectedHub.highlight}
        </p>

        <div className="mt-3 pt-2.5 border-t border-[#F5F3EF]/20 flex items-center justify-between text-[11px] text-[#D9A23B] font-semibold">
          <span className="flex items-center gap-1">
            <Wind className="size-3 text-[#7FA05C]" />
            {selectedHub.region}
          </span>
          <span className="text-[#F5F3EF] font-bold">Interactive 3D Pin</span>
        </div>
      </div>
    </div>
  );
}

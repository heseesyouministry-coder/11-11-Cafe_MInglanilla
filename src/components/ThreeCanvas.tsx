import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Drink3DConfig } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ThreeCanvasProps {
  activeConfig: Drink3DConfig;
  drinkName?: string;
  isInteractive?: boolean;
  onSceneReady?: () => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  activeConfig,
  drinkName = '11:11 Signature',
  isInteractive = true,
  onSceneReady,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cupGroupRef = useRef<THREE.Group | null>(null);
  const liquidMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const sleeveMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const cupMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const iceGroupRef = useRef<THREE.Group | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);

  // Helper to generate dynamic latte art / liquid texture on high-res canvas
  const createLiquidTexture = (
    liquidHex: string,
    foamHex = '#FFF6EB',
    artType: Drink3DConfig['latteArtType'] = 'heart',
    toppingType: Drink3DConfig['toppingType'] = 'none',
    toppingHex = '#C9A227'
  ) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Liquid base fill
    ctx.fillStyle = liquidHex;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    // Crema gradient ring
    const cremaGrad = ctx.createRadialGradient(256, 256, 120, 256, 256, 250);
    cremaGrad.addColorStop(0, 'rgba(0,0,0,0)');
    cremaGrad.addColorStop(0.7, 'rgba(0,0,0,0.15)');
    cremaGrad.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = cremaGrad;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    // Latte Art Patterns
    if (artType === 'heart') {
      ctx.save();
      ctx.translate(256, 260);
      ctx.fillStyle = foamHex;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 10;

      // Outer foam heart
      ctx.beginPath();
      ctx.moveTo(0, 50);
      ctx.bezierCurveTo(-110, -50, -140, -130, 0, -80);
      ctx.bezierCurveTo(140, -130, 110, -50, 0, 50);
      ctx.fill();

      // Inner delicate heart
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, 35);
      ctx.bezierCurveTo(-60, -30, -80, -90, 0, -60);
      ctx.bezierCurveTo(80, -90, 60, -30, 0, 35);
      ctx.fill();

      // Heart stem / pull line
      ctx.strokeStyle = foamHex;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -90);
      ctx.lineTo(0, 75);
      ctx.stroke();

      ctx.restore();
    } else if (artType === 'rosetta') {
      ctx.save();
      ctx.translate(256, 260);
      ctx.fillStyle = foamHex;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 8;

      // Multi-tier Rosetta leaves
      for (let i = 0; i < 6; i++) {
        const yOffset = -90 + i * 28;
        const scale = 1 - i * 0.12;
        ctx.beginPath();
        ctx.ellipse(-30 * scale, yOffset, 40 * scale, 16 * scale, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(30 * scale, yOffset, 40 * scale, 16 * scale, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center stem
      ctx.strokeStyle = foamHex;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(0, -100);
      ctx.lineTo(0, 80);
      ctx.stroke();
      ctx.restore();
    } else if (artType === 'matcha-layer') {
      // Swirled Matcha & Cold Foam Cloud
      const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 230);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.4, foamHex);
      grad.addColorStop(0.75, liquidHex);
      grad.addColorStop(1, '#2E4C26');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(256, 256, 240, 0, Math.PI * 2);
      ctx.fill();

      // Matcha Swirl Clouds
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 14;
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
        const r = 30 + angle * 18;
        const x = 256 + Math.cos(angle) * r;
        const y = 256 + Math.sin(angle) * r;
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else if (artType === 'mocha-swirl') {
      // Swirl mocha chocolate
      ctx.save();
      ctx.translate(256, 256);
      ctx.strokeStyle = toppingHex;
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 6; a += 0.15) {
        const r = 20 + a * 15;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Optional toppings
    if (toppingType === 'cacao-dust' || toppingType === 'oreo-crumbs') {
      ctx.fillStyle = toppingHex;
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 160;
        const size = toppingType === 'oreo-crumbs' ? Math.random() * 6 + 3 : Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(256 + Math.cos(angle) * radius, 256 + Math.sin(angle) * radius, size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (toppingType === 'caramel-drizzle' || toppingType === 'fruit-puree') {
      ctx.strokeStyle = toppingHex;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(120, 160);
      ctx.bezierCurveTo(200, 100, 320, 220, 390, 180);
      ctx.bezierCurveTo(340, 290, 170, 320, 256, 390);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Helper to create branded 11:11 Sleeve Texture
  const createSleeveTexture = (sleeveColor: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Background paper texture
    ctx.fillStyle = sleeveColor;
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle cardboard ridges
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (let x = 0; x < 1024; x += 16) {
      ctx.fillRect(x, 0, 6, 512);
    }

    // Border lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 944, 432);

    // Brand Badge 11:11
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';

    // Top subtitle
    ctx.font = '600 32px Poppins, sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('• MINGLANILLA •', 512, 130);

    // 11:11 Big Logo
    ctx.font = '700 110px Caveat, cursive';
    ctx.fillText('11 : 11', 512, 270);

    // Bottom slogan
    ctx.font = '500 28px Poppins, sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('CAFE & SANCTUARY', 512, 340);

    // Stars / wish mark
    ctx.font = '36px sans-serif';
    ctx.fillText('✦  make a wish  ✦', 512, 410);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 5.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    mainKeyLight.position.set(4, 6, 4);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.001;
    scene.add(mainKeyLight);

    const fillLight = new THREE.PointLight(0xd9a79c, 1.0, 10);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc9a227, 1.5);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    // --- 3D Cup Master Group ---
    const cupGroup = new THREE.Group();
    cupGroupRef.current = cupGroup;
    scene.add(cupGroup);

    // 1. Cup Body (Tapered Cylinder)
    const cupRadiusTop = 0.85;
    const cupRadiusBottom = 0.62;
    const cupHeight = 2.0;
    const cupGeo = new THREE.CylinderGeometry(cupRadiusTop, cupRadiusBottom, cupHeight, 48, 1, true);

    const cupMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeConfig.cupColor || '#F5EFE6'),
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    cupMaterialRef.current = cupMat;
    const cupMesh = new THREE.Mesh(cupGeo, cupMat);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    cupGroup.add(cupMesh);

    // 1b. Cup Bottom Base Disc
    const baseGeo = new THREE.CircleGeometry(cupRadiusBottom, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeConfig.cupColor || '#F5EFE6'),
      roughness: 0.4,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = -cupHeight / 2;
    cupGroup.add(baseMesh);

    // 2. Rolled Top Lip Rim
    const rimGeo = new THREE.TorusGeometry(cupRadiusTop, 0.045, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeConfig.cupColor || '#F5EFE6'),
      roughness: 0.25,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = cupHeight / 2;
    cupGroup.add(rimMesh);

    // 3. Cardboard Sleeve
    const sleeveHeight = 0.95;
    const sleeveRadiusTop = 0.865;
    const sleeveRadiusBottom = 0.73;
    const sleeveGeo = new THREE.CylinderGeometry(sleeveRadiusTop, sleeveRadiusBottom, sleeveHeight, 48);
    const sleeveTexture = createSleeveTexture(activeConfig.sleeveColor || '#C9A227');

    const sleeveMat = new THREE.MeshStandardMaterial({
      map: sleeveTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    sleeveMaterialRef.current = sleeveMat;
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeveMesh.position.y = 0.05;
    sleeveMesh.castShadow = true;
    cupGroup.add(sleeveMesh);

    // 4. Liquid Surface (Latte / Coffee / Matcha Top)
    const liquidGeo = new THREE.CircleGeometry(cupRadiusTop - 0.03, 48);
    const liquidTexture = createLiquidTexture(
      activeConfig.liquidColor,
      activeConfig.foamColor,
      activeConfig.latteArtType,
      activeConfig.toppingType,
      activeConfig.toppingColor
    );
    const liquidMat = new THREE.MeshStandardMaterial({
      map: liquidTexture,
      roughness: 0.2,
      metalness: 0.1,
    });
    liquidMaterialRef.current = liquidMat;
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.y = cupHeight / 2 - 0.14;
    liquidMeshRef.current = liquidMesh;
    cupGroup.add(liquidMesh);

    // 5. Ice Cubes Group for Iced Drinks
    const iceGroup = new THREE.Group();
    iceGroupRef.current = iceGroup;
    const iceGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.85,
      transparent: true,
      roughness: 0.05,
      ior: 1.33,
    });

    for (let i = 0; i < 4; i++) {
      const iceCube = new THREE.Mesh(iceGeo, iceMat);
      const angle = (i * Math.PI * 2) / 4;
      iceCube.position.set(
        Math.cos(angle) * 0.35,
        cupHeight / 2 - 0.08,
        Math.sin(angle) * 0.35
      );
      iceCube.rotation.set(Math.random() * 0.6, Math.random() * 0.6, Math.random() * 0.6);
      iceGroup.add(iceCube);
    }
    iceGroup.visible = !!activeConfig.hasIce;
    cupGroup.add(iceGroup);

    // 6. Steam Particle System for Hot Drinks
    const particleCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = cupHeight / 2 + Math.random() * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      opacities[i] = Math.random();
      scales[i] = Math.random() * 0.15 + 0.05;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create soft steam sprite texture
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const sCtx = steamCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.35,
      map: steamTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    steamParticlesRef.current = steamParticles;
    steamParticles.visible = !!activeConfig.hasSteam;
    cupGroup.add(steamParticles);

    // Initial slight perspective tilt
    cupGroup.rotation.x = 0.28;
    cupGroup.rotation.y = -0.35;

    // --- Interactive Mouse Drag / Tilt ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = -0.35;
    let targetRotationX = 0.28;

    const handlePointerDown = (e: PointerEvent) => {
      if (!isInteractive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isInteractive) return;
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX = Math.max(-0.2, Math.min(0.6, targetRotationX + deltaY * 0.008));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- Responsive Resize ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- GSAP ScrollTrigger Integration ---
    // Smoothly rotates and tracks the cup through scrolling sections
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        if (!isDragging && cupGroupRef.current) {
          // Slow scroll-driven rotation
          cupGroupRef.current.rotation.y = -0.35 + self.progress * Math.PI * 3.5;
        }
      },
    });

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (cupGroupRef.current) {
        // Smooth lerp to target rotation if dragged
        cupGroupRef.current.rotation.y += (targetRotationY - cupGroupRef.current.rotation.y) * 0.08;
        cupGroupRef.current.rotation.x += (targetRotationX - cupGroupRef.current.rotation.x) * 0.08;

        // Subtle idle floating bob
        cupGroupRef.current.position.y = Math.sin(elapsedTime * 1.8) * 0.05;

        // Animate steam particles rising
        if (steamParticlesRef.current && steamParticlesRef.current.visible) {
          const posAttr = steamParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
          const array = posAttr.array as Float32Array;

          for (let i = 0; i < particleCount; i++) {
            array[i * 3 + 1] += delta * 0.35; // rise up
            array[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002; // wisp drift

            // Reset when too high
            if (array[i * 3 + 1] > cupHeight / 2 + 1.8) {
              array[i * 3 + 1] = cupHeight / 2;
              array[i * 3] = (Math.random() - 0.5) * 0.4;
              array[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
            }
          }
          posAttr.needsUpdate = true;
        }

        // Bob ice cubes slightly
        if (iceGroupRef.current && iceGroupRef.current.visible) {
          iceGroupRef.current.rotation.y = elapsedTime * 0.2;
        }
      }

      renderer.render(scene, camera);
    };

    animate();
    if (onSceneReady) onSceneReady();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      scrollTriggerInstance.kill();

      renderer.dispose();
      cupGeo.dispose();
      baseGeo.dispose();
      rimGeo.dispose();
      sleeveGeo.dispose();
      liquidGeo.dispose();
      iceGeo.dispose();
      steamGeo.dispose();
      container.replaceChildren();
    };
  }, []);

  // Update textures & colors when activeConfig changes
  useEffect(() => {
    if (!cupGroupRef.current) return;

    // 1. Update Liquid Material
    if (liquidMaterialRef.current) {
      const newLiquidTexture = createLiquidTexture(
        activeConfig.liquidColor,
        activeConfig.foamColor,
        activeConfig.latteArtType,
        activeConfig.toppingType,
        activeConfig.toppingColor
      );

      // Animate liquid transition with GSAP
      liquidMaterialRef.current.map = newLiquidTexture;
      liquidMaterialRef.current.needsUpdate = true;
    }

    // 2. Update Sleeve Texture & Color
    if (sleeveMaterialRef.current) {
      const newSleeveTexture = createSleeveTexture(activeConfig.sleeveColor || '#C9A227');
      sleeveMaterialRef.current.map = newSleeveTexture;
      sleeveMaterialRef.current.needsUpdate = true;
    }

    // 3. Update Cup Color
    if (cupMaterialRef.current) {
      gsap.to(cupMaterialRef.current.color, {
        r: new THREE.Color(activeConfig.cupColor || '#F5EFE6').r,
        g: new THREE.Color(activeConfig.cupColor || '#F5EFE6').g,
        b: new THREE.Color(activeConfig.cupColor || '#F5EFE6').b,
        duration: 0.6,
      });
    }

    // 4. Update Steam & Ice visibility
    if (steamParticlesRef.current) {
      steamParticlesRef.current.visible = !!activeConfig.hasSteam;
    }
    if (iceGroupRef.current) {
      iceGroupRef.current.visible = !!activeConfig.hasIce;
    }

    // Subtle scale bounce pulse on change
    if (cupGroupRef.current) {
      gsap.fromTo(
        cupGroupRef.current.scale,
        { x: 0.95, y: 0.95, z: 0.95 },
        { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [activeConfig]);

  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center select-none">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform touch-none"
        title="Click and drag to rotate the 3D cup in 360°"
      />
      {/* 3D Interaction Badge */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D1F17]/80 text-[#F5EFE6] text-xs backdrop-blur-md border border-white/10 shadow-lg">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C9A227] animate-ping" />
        <span className="font-medium">3D Drag to Rotate</span>
      </div>
    </div>
  );
};

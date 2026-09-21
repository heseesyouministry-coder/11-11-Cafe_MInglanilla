import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);
    camera.lookAt(0, 0, 0);

    // --- Renderer ---
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

    container.replaceChildren(renderer.domElement);

    // --- Studio Warm Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4df, 2.4);
    keyLight.position.set(4.5, 6.5, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xe8d0c0, 1.1, 10);
    fillLight.position.set(-4, 2, 2.5);
    scene.add(fillLight);

    const goldRimLight = new THREE.DirectionalLight(0xc9a227, 2.0);
    goldRimLight.position.set(-1, -2, -4);
    scene.add(goldRimLight);

    // --- Cup Master Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Saucer Plate
    const saucerGeo = new THREE.CylinderGeometry(1.35, 0.95, 0.12, 48);
    const saucerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FAF6F0'),
      roughness: 0.22,
      metalness: 0.05,
    });
    const saucerMesh = new THREE.Mesh(saucerGeo, saucerMat);
    saucerMesh.position.y = -1.06;
    saucerMesh.castShadow = true;
    saucerMesh.receiveShadow = true;
    masterGroup.add(saucerMesh);

    // 2. Cup Body - Elegant Cream Light Ceramic
    const cupRadiusTop = 0.88;
    const cupRadiusBottom = 0.64;
    const cupHeight = 1.95;
    const cupGeo = new THREE.CylinderGeometry(cupRadiusTop, cupRadiusBottom, cupHeight, 48, 1, true);
    const cupMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FAF7F2'), // warm silk cream
      roughness: 0.24,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });
    const cupMesh = new THREE.Mesh(cupGeo, cupMat);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    masterGroup.add(cupMesh);

    // 2b. Cup Bottom Base
    const baseGeo = new THREE.CircleGeometry(cupRadiusBottom, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FAF7F2'),
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = -cupHeight / 2;
    masterGroup.add(baseMesh);

    // 3. Rolled Top Rim (Warm Champagne Gold rim)
    const rimGeo = new THREE.TorusGeometry(cupRadiusTop, 0.045, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'),
      roughness: 0.2,
      metalness: 0.55,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = cupHeight / 2;
    masterGroup.add(rimMesh);

    // 4. Artisanal Sleeve in Warm Ivory & Gold 11:11 Branding
    const sleeveCanvas = document.createElement('canvas');
    sleeveCanvas.width = 1024;
    sleeveCanvas.height = 512;
    const sCtx = sleeveCanvas.getContext('2d');
    if (sCtx) {
      // Light warm cream / linen kraft background
      sCtx.fillStyle = '#F4ECE1';
      sCtx.fillRect(0, 0, 1024, 512);

      // Delicate vertical paper ribbing
      sCtx.fillStyle = 'rgba(74, 55, 40, 0.04)';
      for (let x = 0; x < 1024; x += 12) {
        sCtx.fillRect(x, 0, 4, 512);
      }

      // Elegant gold and espresso double border frame
      sCtx.strokeStyle = '#C9A227';
      sCtx.lineWidth = 4;
      sCtx.strokeRect(36, 36, 952, 440);

      sCtx.strokeStyle = 'rgba(74, 55, 40, 0.25)';
      sCtx.lineWidth = 2;
      sCtx.strokeRect(46, 46, 932, 420);

      // Typography
      sCtx.textAlign = 'center';

      sCtx.fillStyle = '#6E543C';
      sCtx.font = '600 32px Poppins, sans-serif';
      sCtx.letterSpacing = '8px';
      sCtx.fillText('• MINGLANILLA, CEBU •', 512, 130);

      sCtx.fillStyle = '#2D1F17';
      sCtx.font = '700 128px Caveat, cursive';
      sCtx.fillText('11 : 11', 512, 272);

      sCtx.font = '600 30px Poppins, sans-serif';
      sCtx.fillStyle = '#C9A227';
      sCtx.letterSpacing = '6px';
      sCtx.fillText('CAFE & SANCTUARY', 512, 348);

      sCtx.font = '500 28px Poppins, sans-serif';
      sCtx.fillStyle = '#8C6D4C';
      sCtx.fillText('✦  make a wish  ✦', 512, 418);
    }
    const sleeveTexture = new THREE.CanvasTexture(sleeveCanvas);
    sleeveTexture.wrapS = THREE.RepeatWrapping;
    sleeveTexture.repeat.set(1, 1);
    sleeveTexture.needsUpdate = true;

    const sleeveGeo = new THREE.CylinderGeometry(0.895, 0.76, 0.96, 48);
    const sleeveMat = new THREE.MeshStandardMaterial({
      map: sleeveTexture,
      roughness: 0.45,
      metalness: 0.08,
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeveMesh.position.y = 0.04;
    sleeveMesh.castShadow = true;
    masterGroup.add(sleeveMesh);

    // 5. Crema Liquid Surface & Delicate Heart Latte Art
    const liquidCanvas = document.createElement('canvas');
    liquidCanvas.width = 512;
    liquidCanvas.height = 512;
    const lCtx = liquidCanvas.getContext('2d');
    if (lCtx) {
      // Espresso Crema Base
      lCtx.fillStyle = '#5C381C';
      lCtx.beginPath();
      lCtx.arc(256, 256, 250, 0, Math.PI * 2);
      lCtx.fill();

      // Crema gradient ring
      const grad = lCtx.createRadialGradient(256, 256, 120, 256, 256, 250);
      grad.addColorStop(0, 'rgba(195, 134, 76, 0.9)');
      grad.addColorStop(0.7, 'rgba(120, 72, 32, 0.95)');
      grad.addColorStop(1, '#3B2110');
      lCtx.fillStyle = grad;
      lCtx.beginPath();
      lCtx.arc(256, 256, 250, 0, Math.PI * 2);
      lCtx.fill();

      // Delicate Latte Art Heart
      lCtx.save();
      lCtx.translate(256, 260);
      lCtx.fillStyle = '#FFF8EE';
      lCtx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      lCtx.shadowBlur = 10;

      lCtx.beginPath();
      lCtx.moveTo(0, 50);
      lCtx.bezierCurveTo(-115, -50, -145, -135, 0, -85);
      lCtx.bezierCurveTo(145, -135, 115, -50, 0, 50);
      lCtx.fill();

      // Inner soft heart
      lCtx.fillStyle = '#FFFFFF';
      lCtx.beginPath();
      lCtx.moveTo(0, 35);
      lCtx.bezierCurveTo(-60, -30, -80, -90, 0, -60);
      lCtx.bezierCurveTo(80, -90, 60, -30, 0, 35);
      lCtx.fill();

      // Pull line
      lCtx.strokeStyle = '#FFF8EE';
      lCtx.lineWidth = 11;
      lCtx.lineCap = 'round';
      lCtx.beginPath();
      lCtx.moveTo(0, -95);
      lCtx.lineTo(0, 75);
      lCtx.stroke();
      lCtx.restore();
    }
    const liquidTexture = new THREE.CanvasTexture(liquidCanvas);
    liquidTexture.needsUpdate = true;

    const liquidGeo = new THREE.CircleGeometry(cupRadiusTop - 0.03, 48);
    const liquidMat = new THREE.MeshStandardMaterial({
      map: liquidTexture,
      roughness: 0.22,
      metalness: 0.08,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.y = cupHeight / 2 - 0.12;
    masterGroup.add(liquidMesh);

    // 6. Subtle Steam Particle System
    const particleCount = 38;
    const steamGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.45;
      positions[i * 3 + 1] = cupHeight / 2 + Math.random() * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
      opacities[i] = Math.random();
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const stCtx = steamCanvas.getContext('2d');
    if (stCtx) {
      const grad = stCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      stCtx.fillStyle = grad;
      stCtx.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.38,
      map: steamTexture,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    masterGroup.add(steamParticles);

    // Initial orientation: gentle angle toward user
    masterGroup.rotation.x = 0.24;
    masterGroup.rotation.y = -0.35;

    // --- Interactive Drag-to-Rotate with Smooth Dampening ---
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let targetRotationY = -0.35;
    let targetRotationX = 0.24;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousX;
      const deltaY = e.clientY - previousY;

      targetRotationY += deltaX * 0.007;
      targetRotationX = Math.max(-0.15, Math.min(0.55, targetRotationX + deltaY * 0.007));

      previousX = e.clientX;
      previousY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

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

    // --- Render Loop ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gentle auto-drift if user is not actively dragging
      if (!isDragging) {
        targetRotationY += 0.0025;
      }

      // Smooth interpolation
      masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.08;
      masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.08;

      // Subtle floating bob
      masterGroup.position.y = Math.sin(elapsed * 1.5) * 0.04;

      // Steam wisps drift
      const posAttr = steamParticles.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += delta * 0.3;
        array[i * 3] += Math.sin(elapsed * 2 + i) * 0.0018;

        if (array[i * 3 + 1] > cupHeight / 2 + 1.6) {
          array[i * 3 + 1] = cupHeight / 2;
          array[i * 3] = (Math.random() - 0.5) * 0.35;
          array[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      renderer.dispose();
      saucerGeo.dispose();
      cupGeo.dispose();
      baseGeo.dispose();
      rimGeo.dispose();
      sleeveGeo.dispose();
      liquidGeo.dispose();
      steamGeo.dispose();
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
        title="Click and drag to gently rotate"
      />

      {/* Subtle Floating Badge */}
      <div className="absolute bottom-4 right-4 pointer-events-none z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D1F17]/70 text-[#F5EFE6] text-[11px] backdrop-blur-md border border-white/10 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
        <span className="font-medium tracking-wide">3D · Drag to Rotate</span>
      </div>
    </div>
  );
};

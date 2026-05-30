import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setting up the scene, camera, and WebGL renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 65 : 125;
    const connectionDistance = isMobile ? 9.5 : 8.0;
    const particles: Particle[] = [];
    const mouse = new THREE.Vector2(1000, 1000);

    let targetScrollY = 0;
    let currentScrollY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Particle class for network nodes
    class Particle {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      size: number;
      color: THREE.Color;

      constructor() {
        this.pos = new THREE.Vector3(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40
        );
        this.vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        );
        this.size = Math.random() * 0.2 + 0.1;
        this.color = new THREE.Color(0x3B82F6);
      }

      update() {
        this.pos.add(this.vel);
        if (Math.abs(this.pos.x) > 30) this.vel.x *= -1;
        if (Math.abs(this.pos.y) > 30) this.vel.y *= -1;
        if (Math.abs(this.pos.z) > 20) this.vel.z *= -1;
      }
    }

    // Initialize particles array
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Material configuration
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.25,
    });
    const geometry = new THREE.BufferGeometry();
    const maxLines = isMobile ? 300 : 600;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(geometry, lineMaterial);
    scene.add(lines);

    const pointGeo = new THREE.SphereGeometry(0.12, 6, 6);
    const pointMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const pointMesh = new THREE.InstancedMesh(pointGeo, pointMat, particleCount);
    scene.add(pointMesh);

    let animationId: number;
    const tempMouseVec = new THREE.Vector3();
    const tempDiffVec = new THREE.Vector3();
    const cameraLookTarget = new THREE.Vector3();
    const tempMatrix = new THREE.Matrix4();

    const updateWindowSize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", updateWindowSize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 40 - 20;
      mouse.y = -(e.clientY / window.innerHeight) * 40 + 20;

      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 3.5;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 3.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smoothed interpolation (lerp) for ultimate fluid responsive travel
      currentScrollY += (targetScrollY - currentScrollY) * 0.04;
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Smooth camera translation & parallax lookAt trajectory
      camera.position.z = 30 - (currentScrollY * 0.012);
      camera.position.x = currentMouseX;
      camera.position.y = -(currentScrollY * 0.006) - currentMouseY;
      
      cameraLookTarget.set(0, -(currentScrollY * 0.006), 0);
      camera.lookAt(cameraLookTarget);

      // Continuous slow structural drift & scroll-based rotation twist
      const driftAngle = Date.now() * 0.00003;
      const scrollRotY = currentScrollY * 0.00015;
      const scrollRotX = currentScrollY * 0.00008;

      lines.rotation.y = driftAngle + scrollRotY;
      pointMesh.rotation.y = driftAngle + scrollRotY;
      lines.rotation.x = scrollRotX;
      pointMesh.rotation.x = scrollRotX;

      tempMouseVec.set(mouse.x, mouse.y, 0);
      let drawCount = 0;

      particles.forEach((p, i) => {
        p.update();
        tempMatrix.setPosition(p.pos);
        pointMesh.setMatrixAt(i, tempMatrix);

        // Mouse interaction: push nodes gently away if close
        const distToMouse = p.pos.distanceTo(tempMouseVec);
        if (distToMouse < 10) {
          tempDiffVec.copy(p.pos).sub(tempMouseVec).normalize().multiplyScalar(0.1);
          p.pos.add(tempDiffVec);
        }

        // Connect near neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const dist = p.pos.distanceTo(particles[j].pos);
          if (dist < connectionDistance) {
            if (drawCount < maxLines) {
              const baseIndex = drawCount * 6;
              linePositions[baseIndex] = p.pos.x;
              linePositions[baseIndex + 1] = p.pos.y;
              linePositions[baseIndex + 2] = p.pos.z;
              linePositions[baseIndex + 3] = particles[j].pos.x;
              linePositions[baseIndex + 4] = particles[j].pos.y;
              linePositions[baseIndex + 5] = particles[j].pos.z;
              drawCount++;
            }
          }
        }
      });

      geometry.attributes.position.needsUpdate = true;
      geometry.setDrawRange(0, drawCount * 2);
      pointMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationId);

      // Clean up resources to prevent leaks
      geometry.dispose();
      pointGeo.dispose();
      pointMat.dispose();
      lineMaterial.dispose();
      pointMesh.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      className="fixed inset-0 pointer-events-none w-full h-full"
      style={{ zIndex: -10 }}
      ref={canvasRef}
    />
  );
}

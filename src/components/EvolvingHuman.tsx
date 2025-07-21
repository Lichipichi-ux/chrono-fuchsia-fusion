import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface EvolvingHumanProps {
  stage: number; // 0-4 evolution stages
}

export const EvolvingHuman = ({ stage }: EvolvingHumanProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const humanGroupRef = useRef<THREE.Group>();
  const dnaParticlesRef = useRef<THREE.Points>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 300 / 400, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(300, 400);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Create human group
    const humanGroup = new THREE.Group();
    humanGroupRef.current = humanGroup;
    scene.add(humanGroup);

    // Create human figure based on evolution stage
    createHumanFigure(humanGroup, stage);

    // Create DNA particles
    createDNAParticles(scene);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Floating animation
      if (humanGroup) {
        humanGroup.position.y = Math.sin(time) * 0.1;
        humanGroup.rotation.y = Math.sin(time * 0.5) * 0.1;
      }

      // DNA particles animation
      if (dnaParticlesRef.current) {
        dnaParticlesRef.current.rotation.y += 0.01;
        const positions = dnaParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time + i) * 0.001;
        }
        dnaParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [stage]);

  const createHumanFigure = (group: THREE.Group, evolutionStage: number) => {
    group.clear();

    const stageConfigs = [
      // Stage 0: Basic human
      { 
        bodyColor: 0xFFDBB5, 
        augmentations: [],
        glow: false,
        wireframe: false
      },
      // Stage 1: Neural augmentation
      { 
        bodyColor: 0xFFDBB5, 
        augmentations: ['neural'],
        glow: true,
        wireframe: false
      },
      // Stage 2: Cybernetic integration
      { 
        bodyColor: 0xC0C0C0, 
        augmentations: ['neural', 'limbs'],
        glow: true,
        wireframe: false
      },
      // Stage 3: Quantum consciousness
      { 
        bodyColor: 0x9966FF, 
        augmentations: ['neural', 'limbs', 'torso'],
        glow: true,
        wireframe: true
      },
      // Stage 4: Digital transcendence
      { 
        bodyColor: 0x00FFFF, 
        augmentations: ['full'],
        glow: true,
        wireframe: true
      }
    ];

    const config = stageConfigs[evolutionStage];

    // Create basic human shape
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 8, 16);
    const bodyMaterial = new THREE.MeshLambertMaterial({ 
      color: config.bodyColor,
      wireframe: config.wireframe,
      transparent: true,
      opacity: config.wireframe ? 0.7 : 1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshLambertMaterial({ 
      color: config.bodyColor,
      wireframe: config.wireframe,
      transparent: true,
      opacity: config.wireframe ? 0.7 : 1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.85;
    group.add(head);

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.1, 0.8, 6, 12);
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.5, 0.2, 0);
    leftArm.rotation.z = Math.PI / 6;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.5, 0.2, 0);
    rightArm.rotation.z = -Math.PI / 6;
    group.add(rightArm);

    // Legs
    const legGeometry = new THREE.CapsuleGeometry(0.12, 1, 6, 12);
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    leftLeg.position.set(-0.2, -1.1, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    rightLeg.position.set(0.2, -1.1, 0);
    group.add(rightLeg);

    // Add augmentations based on stage
    if (config.augmentations.includes('neural')) {
      // Neural implants
      const implantGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const implantMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xFF00FF,
        emissive: 0xFF00FF,
        emissiveIntensity: 0.3
      });
      
      const implant1 = new THREE.Mesh(implantGeometry, implantMaterial);
      implant1.position.set(0.15, 0.9, 0.2);
      group.add(implant1);

      const implant2 = new THREE.Mesh(implantGeometry, implantMaterial);
      implant2.position.set(-0.15, 0.9, 0.2);
      group.add(implant2);
    }

    if (config.augmentations.includes('limbs')) {
      // Cybernetic limb enhancements
      const enhancementMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x00FFFF,
        emissive: 0x00FFFF,
        emissiveIntensity: 0.2
      });

      [leftArm, rightArm, leftLeg, rightLeg].forEach((limb, i) => {
        const enhancement = new THREE.RingGeometry(0.12, 0.15, 8);
        const enhancementMesh = new THREE.Mesh(enhancement, enhancementMaterial);
        enhancementMesh.position.copy(limb.position);
        enhancementMesh.rotation.x = Math.PI / 2;
        group.add(enhancementMesh);
      });
    }

    if (config.augmentations.includes('torso')) {
      // Torso modifications
      const coreGeometry = new THREE.SphereGeometry(0.15, 12, 12);
      const coreMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xFFFF00,
        emissive: 0xFFFF00,
        emissiveIntensity: 0.4
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      core.position.y = 0.2;
      group.add(core);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    group.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    group.add(directionalLight);

    if (config.glow) {
      const pointLight = new THREE.PointLight(0xFF00FF, 1, 10);
      pointLight.position.set(0, 0.5, 1);
      group.add(pointLight);
    }
  };

  const createDNAParticles = (scene: THREE.Scene) => {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 4;
      const radius = 2 + Math.sin(t * 2) * 0.5;
      
      positions[i * 3] = Math.cos(t) * radius;
      positions[i * 3 + 1] = (i / particleCount) * 8 - 4;
      positions[i * 3 + 2] = Math.sin(t) * radius;

      // DNA colors
      const colorIndex = Math.floor(Math.random() * 3);
      colors[i * 3] = colorIndex === 0 ? 1 : 0;     // Red
      colors[i * 3 + 1] = colorIndex === 1 ? 1 : 0; // Green
      colors[i * 3 + 2] = colorIndex === 2 ? 1 : 0; // Blue
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    dnaParticlesRef.current = particles;
    scene.add(particles);
  };

  return (
    <div className="relative">
      <div ref={containerRef} className="w-[300px] h-[400px]" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-primary text-sm font-mono text-center">
        {['BIOLOGICAL', 'NEURAL AUG', 'CYBERNETIC', 'QUANTUM', 'DIGITAL'][stage]}
      </div>
    </div>
  );
};
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const InteractivePlanet = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const planetRef = useRef<THREE.Mesh>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Create planet geometry
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    
    // Create wireframe material with cyberpunk colors
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          // Create grid pattern
          float gridX = abs(fract(vPosition.x * 10.0) - 0.5) / fwidth(vPosition.x * 10.0);
          float gridY = abs(fract(vPosition.y * 10.0) - 0.5) / fwidth(vPosition.y * 10.0);
          float grid = min(gridX, gridY);
          
          // Animated colors
          vec3 fuchsia = vec3(1.0, 0.0, 1.0);
          vec3 cyan = vec3(0.0, 1.0, 1.0);
          vec3 green = vec3(0.0, 1.0, 0.5);
          
          vec3 color = mix(fuchsia, cyan, sin(time * 0.5) * 0.5 + 0.5);
          color = mix(color, green, cos(time * 0.3) * 0.3 + 0.3);
          
          float alpha = (1.0 - grid) * intensity;
          alpha += intensity * 0.3; // Base glow
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        time: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    const planet = new THREE.Mesh(geometry, material);
    planetRef.current = planet;
    scene.add(planet);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glow = vec3(1.0, 0.0, 1.0) * intensity;
          glow += vec3(0.0, 1.0, 1.0) * intensity * (sin(time) * 0.5 + 0.5);
          gl_FragColor = vec4(glow, intensity * 0.3);
        }
      `,
      uniforms: {
        time: { value: 0 }
      },
      transparent: true,
      side: THREE.BackSide
    });

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Mouse interaction
    const handleMouseDown = (event: MouseEvent) => {
      isDragging.current = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging.current || !planetRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      planetRef.current.rotation.y += deltaX * 0.01;
      planetRef.current.rotation.x += deltaY * 0.01;
      glowMesh.rotation.y += deltaX * 0.01;
      glowMesh.rotation.x += deltaY * 0.01;

      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Add mouse event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      
      // Update shader uniforms
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }
      if (glowMaterial.uniforms) {
        glowMaterial.uniforms.time.value = time;
      }

      // Auto-rotation when not dragging
      if (!isDragging.current && planetRef.current) {
        planetRef.current.rotation.y += 0.002;
        glowMesh.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ width: '600px', height: '600px' }}
    />
  );
};
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { RefObject } from 'react'
import * as THREE from 'three'
import { createMolarCrown, createMolarRoot, createStudioEnvironment } from './createToothGeometry'

export type Pointer2D = { x: number; y: number }

type SceneProps = {
  pointer: RefObject<Pointer2D>
  reduced: boolean
  detail: 'high' | 'low'
}

function Tooth({ pointer, reduced }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const keyLight = useRef<THREE.SpotLight>(null)
  const spin = useRef(0.4)
  const crown = useMemo(() => createMolarCrown(), [])
  const roots = useMemo(
    () => [
      createMolarRoot(-1, 1),
      createMolarRoot(1, 1),
      createMolarRoot(-1, -1),
      createMolarRoot(1, -1),
    ],
    [],
  )
  const { gl, scene } = useThree()

  useEffect(() => {
    let target: THREE.WebGLRenderTarget | null = null
    try {
      target = createStudioEnvironment(gl)
      scene.environment = target.texture
      scene.environmentIntensity = 0.42
    } catch {
      scene.environment = null
    }
    return () => {
      scene.environment = null
      target?.dispose()
    }
  }, [gl, scene])

  useEffect(
    () => () => {
      crown.dispose()
      roots.forEach((root) => root.dispose())
    },
    [crown, roots],
  )

  useFrame((state, delta) => {
    const tooth = group.current
    if (!tooth) return
    const time = state.clock.elapsedTime
    const px = pointer.current.x
    const py = pointer.current.y
    const speed = reduced ? 0.28 : 0.72
    spin.current += delta * speed

    tooth.rotation.y = spin.current + px * 0.45
    tooth.rotation.x = THREE.MathUtils.damp(
      tooth.rotation.x,
      0.3 + py * 0.18 + Math.sin(time * 0.7) * 0.06,
      3,
      delta,
    )
    tooth.rotation.z = THREE.MathUtils.damp(
      tooth.rotation.z,
      Math.sin(time * 0.45) * 0.06 + px * 0.04,
      3,
      delta,
    )
    tooth.position.y = THREE.MathUtils.damp(
      tooth.position.y,
      Math.sin(time * 1.15) * (reduced ? 0.03 : 0.1),
      2.4,
      delta,
    )

    if (keyLight.current) {
      keyLight.current.position.x = Math.cos(time * 0.55) * 3.4 + px
      keyLight.current.position.z = 3.2 + Math.sin(time * 0.55) * 1.6
      keyLight.current.position.y = 4.6 - py * 0.4
    }

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px * 0.28, 2, delta)
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.15 - py * 0.12,
      2,
      delta,
    )
    state.camera.lookAt(0, 0.02, 0)
  })

  return (
    <>
      <hemisphereLight args={['#f7fbff', '#070b10', 0.16]} />
      <ambientLight intensity={0.025} color="#9aafbc" />
      <spotLight
        ref={keyLight}
        castShadow
        position={[-1.6, 3.8, 3.2]}
        angle={0.5}
        penumbra={0.45}
        intensity={96}
        color="#fff4e6"
        distance={14}
        decay={1.2}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.03}
      />
      <spotLight
        position={[3.2, 1.4, -2.8]}
        angle={0.7}
        penumbra={1}
        intensity={18}
        color="#6ec8e6"
        distance={14}
        decay={1.4}
      />
      <directionalLight position={[-2.2, 3.4, 2.4]} intensity={2.4} color="#fffaf4" />
      <group ref={group} position={[0, 0.18, 0]} scale={0.68}>
        <mesh geometry={crown} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#f4efe6"
            roughness={0.22}
            metalness={0}
            clearcoat={0.65}
            clearcoatRoughness={0.18}
            sheen={0.15}
            sheenRoughness={0.4}
            sheenColor="#d5e4ee"
            specularIntensity={0.55}
            ior={1.5}
            envMapIntensity={0.55}
          />
        </mesh>
        {roots.map((root, index) => (
          <mesh key={index} geometry={root} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#efe8dc"
              roughness={0.28}
              metalness={0}
              clearcoat={0.45}
              clearcoatRoughness={0.24}
              sheen={0.1}
              sheenColor="#eadfce"
              specularIntensity={0.4}
              envMapIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

type CanvasProps = SceneProps & {
  active: boolean
  onReady: () => void
}

export default function ToothCanvas({ active, onReady, ...scene }: CanvasProps) {
  return (
    <Canvas
      shadows="soft"
      camera={{ position: [0.12, 0.04, 6.8], fov: 26, near: 0.1, far: 40 }}
      dpr={scene.detail === 'high' ? [1, 1.5] : [1, 1.2]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.2
        onReady()
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Tooth {...scene} />
    </Canvas>
  )
}

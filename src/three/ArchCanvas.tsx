import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import type { RefObject } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/** Arcada montada a partir de "Dental arches" (Lydran96, CC BY 4.0) — ver public/models/CREDITS.txt */
export const ARCH_URL = '/models/arcada.glb'

/** Estado compartilhado entre a página e a cena (sem re-render). */
export type ArchControl = {
  pointer: { x: number; y: number }
  /** rotação aplicada pelo arraste, consumida a cada quadro */
  drag: number
  /** velocidade extra de giro (inércia do arraste) */
  fling: number
  /** pulo disparado pelo clique (1 → 0) */
  bite: number
  /** progresso da rolagem do hero (0 a 1) */
  scroll: number
  /** brilho disparado pelo clique (1 → 0) */
  flash: number
}

type SceneProps = {
  control: RefObject<ArchControl>
  paused: boolean
  detail: 'high' | 'low'
  onHover: (hovering: boolean) => void
  onReady: () => void
}

type Tooth = { mesh: THREE.Mesh; material: THREE.MeshPhysicalMaterial }

/**
 * Manequim odontológico: dentes de "Dental arches" (Lydran96, CC BY 4.0) alinhados numa arcada em U,
 * com gengiva fechando em cima (palato) e embaixo (base). O arquivo não traz normais: são calculadas aqui.
 */
function useArch() {
  const gltf = useLoader(GLTFLoader, ARCH_URL)
  return useMemo(() => {
    const root = gltf.scene.clone(true)
    const teeth: Tooth[] = []
    const materials: THREE.Material[] = []
    const gum = new THREE.MeshPhysicalMaterial({
      color: '#c8264a',
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      sheen: 0.35,
      sheenRoughness: 0.4,
      sheenColor: new THREE.Color('#ff9fb2'),
      envMapIntensity: 0.55,
      side: THREE.DoubleSide,
    })
    materials.push(gum)
    root.traverse((object) => {
      const mesh = object as THREE.Mesh
      if (!mesh.isMesh) return
      // base e fundo planos ficam com normais retas; o resto, suavizado
      if (mesh.name.endsWith('_base')) mesh.geometry = mesh.geometry.toNonIndexed()
      mesh.geometry.computeVertexNormals()
      if (mesh.name.startsWith('gengiva')) {
        mesh.material = gum
        mesh.raycast = () => {}
        return
      }
      const material = new THREE.MeshPhysicalMaterial({
        color: '#fbfaf6',
        roughness: 0.24,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        sheen: 0.25,
        sheenColor: new THREE.Color('#dff6ff'),
        envMapIntensity: 0.8,
        emissive: new THREE.Color('#9fe6ff'),
        emissiveIntensity: 0,
      })
      mesh.material = material
      materials.push(material)
      teeth.push({ mesh, material })
    })
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = 3.9 / Math.max(size.x, size.y, size.z)
    return { root, teeth, materials, center, scale }
  }, [gltf])
}

const orbiters = Array.from({ length: 10 }, (_, i) => ({
  radius: 2.1 + (i % 3) * 0.3,
  speed: 0.18 + (i % 4) * 0.07,
  size: 0.05 + ((i * 37) % 10) / 90,
  tilt: (i / 10) * Math.PI,
  offset: (i / 10) * Math.PI * 2,
}))

function Scene({ control, paused, detail, onHover, onReady }: SceneProps) {
  const arch = useArch()
  const spinner = useRef<THREE.Group>(null)
  const orbitGroup = useRef<THREE.Group>(null)
  const spin = useRef(0)
  const hovered = useRef<Tooth | null>(null)
  const framed = useRef(false)
  const { gl, scene, size } = useThree()
  const aspect = size.width / Math.max(1, size.height)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.85
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  useEffect(() => {
    onReady()
  }, [onReady])

  useEffect(() => () => arch.materials.forEach((material) => material.dispose()), [arch])

  useFrame((state, delta) => {
    const c = control.current
    const t = state.clock.elapsedTime
    const speed = paused ? 0 : 1

    spin.current += c.drag
    c.drag = 0
    c.fling = THREE.MathUtils.damp(c.fling, 0, 2.2, delta)
    spin.current += delta * c.fling
    // depois de girado pelo usuário, volta devagar para a frente
    if (Math.abs(c.fling) < 0.05) spin.current = THREE.MathUtils.damp(spin.current, Math.round(spin.current / (Math.PI * 2)) * Math.PI * 2, 0.6, delta)

    c.bite = THREE.MathUtils.damp(c.bite, 0, 3, delta)
    c.flash = THREE.MathUtils.damp(c.flash, 0, 3, delta)

    const group = spinner.current
    if (group) {
      // balanço suave mostrando frente e laterais
      group.rotation.y = spin.current + Math.sin(t * 0.45) * 0.85 * speed + c.pointer.x * 0.35
      group.rotation.x = THREE.MathUtils.damp(
        group.rotation.x,
        0.12 + c.pointer.y * 0.2 + c.scroll * 0.35 + Math.sin(t * 0.7) * 0.05 * speed,
        3,
        delta,
      )
      // pulinho elástico no clique
      const hop = Math.sin(c.bite * Math.PI) * 0.25
      group.position.y = -0.3 + Math.sin(t * 1.1) * 0.08 * speed - c.scroll * 0.4 + hop
      group.scale.setScalar(1 + c.flash * 0.06)
    }

    for (const tooth of arch.teeth) {
      const goal = (hovered.current === tooth ? 0.45 : 0) + c.flash * 0.35
      tooth.material.emissiveIntensity = THREE.MathUtils.damp(tooth.material.emissiveIntensity, goal, 8, delta)
    }

    if (orbitGroup.current) {
      orbitGroup.current.children.forEach((child, i) => {
        const o = orbiters[i]
        const a = o.offset + t * o.speed * speed
        child.position.set(Math.cos(a) * o.radius, Math.sin(a * 1.3 + o.tilt) * 1.2, Math.sin(a) * o.radius * 0.6)
      })
    }

    const camera = state.camera as THREE.PerspectiveCamera
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    const fit = Math.max(2.25 / (tanHalf * aspect), 1.55 / tanHalf)
    // no primeiro quadro já posiciona; depois acompanha mudanças de tamanho suavemente
    camera.position.z = framed.current ? THREE.MathUtils.damp(camera.position.z, fit, 4, delta) : fit
    framed.current = true
    camera.position.x = THREE.MathUtils.damp(camera.position.x, c.pointer.x * 0.35, 2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.3 - c.pointer.y * 0.25, 2, delta)
    camera.lookAt(0, 0, 0)
  })

  const over = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const tooth = arch.teeth.find((item) => item.mesh === event.object) ?? null
    if (!tooth) return
    hovered.current = tooth
    onHover(true)
  }
  const out = (event: ThreeEvent<PointerEvent>) => {
    if (hovered.current?.mesh === event.object) {
      hovered.current = null
      onHover(false)
    }
  }

  const segments = detail === 'high' ? 24 : 14

  return (
    <>
      <hemisphereLight args={['#ffffff', '#3d8fc4', 0.5]} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} color="#fffaf2" />
      <directionalLight position={[-4, 1.5, -3]} intensity={1.1} color="#7fd8ff" />
      <pointLight position={[0, -2.5, 2.5]} intensity={2.5} color="#fff1f3" distance={9} />

      <group ref={spinner}>
        {/* modelo: Z para cima e frente em +X → Y para cima e frente para a câmera */}
        <group rotation={[0, -Math.PI / 2, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={arch.scale}>
            <group position={[-arch.center.x, -arch.center.y, -arch.center.z]}>
              <primitive object={arch.root} onPointerOver={over} onPointerOut={out} />
            </group>
          </group>
        </group>
      </group>

      <group ref={orbitGroup}>
        {orbiters.map((o, i) => (
          <mesh key={i} scale={o.size}>
            <sphereGeometry args={[1, segments, segments]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.42}
              roughness={0}
              clearcoat={1}
              iridescence={1}
              iridescenceIOR={1.3}
              envMapIntensity={1.8}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

type CanvasProps = SceneProps & { active: boolean }

export default function ArchCanvas({ active, ...scene }: CanvasProps) {
  return (
    <Canvas
      data-interactive=""
      camera={{ position: [0, 0.3, 9], fov: 30, near: 0.1, far: 60 }}
      dpr={scene.detail === 'high' ? [1, 1.75] : [1, 1.3]}
      frameloop={active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene {...scene} />
      </Suspense>
    </Canvas>
  )
}

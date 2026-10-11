import * as THREE from 'three'

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

function cusp(nx: number, nz: number, cx: number, cz: number, power: number) {
  const dx = nx - cx
  const dz = nz - cz
  return Math.exp(-(dx * dx + dz * dz) * power)
}

export function createMolarCrown() {
  const geometry = new THREE.SphereGeometry(1, 96, 80)
  const position = geometry.attributes.position
  const vertex = new THREE.Vector3()

  for (let index = 0; index < position.count; index += 1) {
    vertex.fromBufferAttribute(position, index)
    const length = vertex.length() || 1
    const nx = vertex.x / length
    const ny = vertex.y / length
    const nz = vertex.z / length
    const t = (ny + 1) / 2
    const rise = Math.sin(Math.min(t * 1.05, 1) * (Math.PI / 2))
    const spread = Math.hypot(nx, nz) ** 0.55
    const radius = (0.4 + rise * 0.32 - smooth(t) * 0.05) * spread
    const horiz = Math.hypot(nx, nz) || 1
    let x = (nx / horiz) * radius
    let z = (nz / horiz) * radius * 0.9
    let y = -0.22 + t * 1.08

    const top = smooth((t - 0.58) / 0.42)
    const bumps =
      cusp(nx, nz, 0.4, 0.34, 8) +
      cusp(nx, nz, -0.4, 0.34, 8) +
      cusp(nx, nz, 0.4, -0.34, 8) +
      cusp(nx, nz, -0.4, -0.34, 8)
    const fossa = Math.exp(-(nx * nx + nz * nz) * 7)
    y += top * (bumps * 0.08 - fossa * 0.04)
    position.setXYZ(index, x, y, z)
  }

  position.needsUpdate = true
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
  return geometry
}

export function createMolarRoot(sx: 1 | -1, sz: 1 | -1) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(sx * 0.15, 0.05, sz * 0.12),
    new THREE.Vector3(sx * 0.18, -0.3, sz * 0.15),
    new THREE.Vector3(sx * 0.2, -0.64, sz * 0.16),
    new THREE.Vector3(sx * 0.18, -1.02, sz * 0.13),
  ])
  const geometry = new THREE.TubeGeometry(curve, 72, 0.18, 28, false)
  const position = geometry.attributes.position
  const vertex = new THREE.Vector3()
  const center = new THREE.Vector3()
  const span = 1.07

  for (let index = 0; index < position.count; index += 1) {
    vertex.fromBufferAttribute(position, index)
    const along = THREE.MathUtils.clamp((0.05 - vertex.y) / span, 0, 1)
    curve.getPointAt(along, center)
    const scale = 1 - along ** 1.15 * 0.9
    vertex.sub(center).multiplyScalar(scale).add(center)
    position.setXYZ(index, vertex.x, vertex.y, vertex.z)
  }

  position.needsUpdate = true
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
  return geometry
}

export function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#d7ebf4')
  const panels: THREE.Mesh[] = []

  const addPanel = (color: string, width: number, height: number, x: number, y: number, z: number) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
    )
    mesh.position.set(x, y, z)
    mesh.lookAt(0, 0, 0)
    scene.add(mesh)
    panels.push(mesh)
  }

  addPanel('#ffffff', 14, 14, 0, 0, 8)
  addPanel('#fffdf8', 5, 8, 6, 3, 2)
  addPanel('#9fd8ee', 6, 9, -6.5, 1.5, 1)
  addPanel('#ffffff', 10, 3, 0, 7, 2)
  addPanel('#c5d5df', 8, 4, 1, -5.5, 2)

  const generator = new THREE.PMREMGenerator(renderer)
  const target = generator.fromScene(scene, 0.04)
  generator.dispose()
  panels.forEach((panel) => {
    panel.geometry.dispose()
    if (Array.isArray(panel.material)) panel.material.forEach((item) => item.dispose())
    else panel.material.dispose()
  })
  return target
}

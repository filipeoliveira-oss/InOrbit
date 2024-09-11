//@ts-nocheck

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function AngryFace(props) {
  const { nodes, materials } = useGLTF('/angryface.gltf')
  return (
    <group {...props} dispose={null} >
      <mesh geometry={nodes['Node_#0'].geometry} material={nodes['Node_#0'].material} />
    </group>
  )
}

useGLTF.preload('/angryface.gltf')

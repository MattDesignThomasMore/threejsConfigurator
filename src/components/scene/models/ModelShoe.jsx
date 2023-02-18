import { useGLTF, GradientTexture } from "@react-three/drei";
import { useRef } from "react";

function ModelShoe({...props}){
  const { nodes, materials } = useGLTF('/model.glb');
  const group = useRef();
  return (
    <group {...props} ref={group} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} scale={[0.5,0,0]}  />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} >

      </mesh>
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps}/>
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} >

      </mesh>
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={'#7f6'}>
      </mesh>
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={'#6cc7f6'}>
        <meshStandardMaterial>
          <GradientTexture
            stops={[0, 0.5,1]} // As many stops as you want
            colors={['green', 'red',  'red']} // Colors need to match the number of stops
            //size={9} // Size is optional, default = 1024
          />
          </meshStandardMaterial>

      </mesh>
    </group>
  )
}

export default ModelShoe

import * as React from 'react'
import GltfModel from './GltfModel'
import Specs from './Specs'

// combination of specs + head model
const Model = (props) => {
  console.log(props)

  const variables = props.modelProps.variables
  const eventFunctions = props.modelProps.functions

  function onClick(event) {
    console.log(variables.clicks)

    if (variables.clicks <= 3) eventFunctions.setClicks(variables.clicks + 1)

    if (variables.clicks === 1) {
      eventFunctions.setFront([event.point.x, event.point.y, event.point.z])
    } else if (variables.clicks === 2) {
      eventFunctions.setLeft([event.point.x, event.point.y, event.point.z])
    } else if (variables.clicks === 3) {
      eventFunctions.setRight([event.point.x, event.point.y, event.point.z])
    }
  }

  if (!variables.render) {
    return (
      <>
        <GltfModel position={[0, -150, 0]} onClick={onClick} scale={1100} rotation={props.rotation}/>
        <mesh position={props.specsInfo.frameFront.position}>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
        <mesh position={props.specsInfo.leftArm.position}>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
        <mesh position={props.specsInfo.rightArm.position}>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>
      </> 
    )
  } else {
    return (
      <>
        <GltfModel position={[0, -150, 0]} onClick={onClick} scale={1100} rotation={props.rotation} />
        {/* <primitive object={new THREE.AxesHelper(100)} /> */}
        <Specs specsInfo={props.specsInfo} customScale={props.modelProps.specCustomisations} setFrameWeight={props.setFrameWeight} />
      </>
    )
  }
}

export default Model

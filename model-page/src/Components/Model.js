import React, { useState } from 'react'
import GltfModel from './GltfModel'
import Specs from './Specs'
import * as THREE from 'three'

const Model = (props) => {
  console.log(props)
  const [rotation, setRotation] = useState([0, 0, 0])
  const [spec_scale, setScale] = useState(1)

  const variables = props.modelProps.variables
  const eventFunctions = props.modelProps.functions

  function onClick(event) {
    console.log(variables.clicks)

    if (variables.clicks <= 3) eventFunctions.setClicks(variables.clicks + 1)

    if (variables.clicks == 1) {
      eventFunctions.setFront([event.point.x, event.point.y, event.point.z])
      // let frontInfo = {
      //   position: [event.point.x, event.point.y, event.point.z],
      // }
      // eventFunctions.setFrame((frameFront) => ({
      //   ...variables.frameFront,
      //   ...frontInfo,
      // }))
    } else if (variables.clicks == 2) {
      eventFunctions.setLeft([event.point.x, event.point.y, event.point.z])
      // let leftInfo = { position: [event.point.x, event.point.y, event.point.z] }
      // eventFunctions.setLeftArm((leftArm) => ({
      //   ...variables.leftArm,
      //   ...leftInfo,
      // }))
    } else if (variables.clicks == 3) {
      eventFunctions.setRight([event.point.x, event.point.y, event.point.z])
      // let rightInfo = {
      //   position: [event.point.x, event.point.y, event.point.z],
      // }
      // eventFunctions.setRightArm((rightArm) => ({
      //   ...variables.rightArm,
      //   ...rightInfo,
      // }))
    }
  }

  if (!variables.render) {
    return (
      <GltfModel
        position={[0, -150, 0]}
        onClick={onClick}
        scale={1250}
        rotation={rotation}
      />
      // <Specs specsInfo={props.specsInfo} />
    )
  } else {
    console.log(props.specsInfo)
    return (
      <>
        <GltfModel position={[0, -150, 0]} onClick={onClick} scale={1250} />
        <primitive object={new THREE.AxesHelper(100)} />
        <Specs specsInfo={props.specsInfo} customScale={props.modelProps.specCustomisations} />
      </>
    )
  }
}

export default Model

import React, { useState } from 'react'
import GltfModel from './GltfModel'
import Specs from './Specs'
import * as THREE from 'three'

const Model = (props) => {
  console.log(props)

  const variables = props.modelProps.variables
  const eventFunctions = props.modelProps.functions

  function onClick(event) {
    console.log(variables.clicks)

    if (variables.clicks <= 3) eventFunctions.setClicks(variables.clicks + 1)

    if (variables.clicks == 1) {
      eventFunctions.setFront([event.point.x, event.point.y, event.point.z])
    } else if (variables.clicks == 2) {
      eventFunctions.setLeft([event.point.x, event.point.y, event.point.z])
    } else if (variables.clicks == 3) {
      eventFunctions.setRight([event.point.x, event.point.y, event.point.z])
    }
  }

  if (!variables.render) {
    return (
      <GltfModel
        position={[0, -150, 0]}
        onClick={onClick}
        scale={1250}
        rotation={props.rotation}
      />
      // <Specs specsInfo={props.specsInfo} />
    )
  } else {
    console.log(props.specsInfo)
    return (
      <>
        <GltfModel position={[0, -150, 0]} onClick={onClick} scale={1250} rotation={props.rotation} />
        <primitive object={new THREE.AxesHelper(100)} />
        <Specs specsInfo={props.specsInfo} customScale={props.modelProps.specCustomisations} />
      </>
    )
  }
}

export default Model

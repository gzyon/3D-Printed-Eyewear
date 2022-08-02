import React from "react"

const Frame2 = (props) => {
    console.log(props.geometry);

    function getGeometry(object) {
        let geom;
        object.traverse(function(child) {
            if (child.geometry != null) {
                geom = child.geometry;
            }
        });

        return geom;
    }

    return (
        <mesh>
            <boxGeometry args={[5, 5, 5]} />
            <meshStandardMaterial attach="material" color={0xff0000} />
        </mesh>
    )
}

export default Frame2;
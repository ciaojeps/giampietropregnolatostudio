import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)
const cameraTarget = new THREE.Vector3(0, -0.5, 0)

export default function CameraAnimation() {
  const tl = gsap.timeline()

  const camera = useThree((state) => state.camera)

  useFrame((state, delta) => {
    camera.lookAt(cameraTarget)
  })

  useGSAP(
    () => {
      tl.fromTo(
        camera.position,
        { x: 0, y: 1, z: 4 },
        {
          x: 2.56,
          y: -1.01,
          z: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.section-2',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.5
          }
        }
      )
      tl.fromTo(
        cameraTarget,
        {
          x: 0,
          y: -0.5,
          z: 0
        },
        {
          x: -4,
          y: 0,
          z: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.section-2',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.5
          }
        },
        '<'
      )
        .to(
          '.section-1 .wrapper',
          {
            opacity: 0,
            scrollTrigger: {
              trigger: '.section-2',
              start: 'top bottom',
              end: 'top 70%',
              scrub: 0.5
            }
          },
          '<'
        )
        .fromTo(
          camera.position,
          { x: 2.56, y: -1.01, z: 2 },
          {
            x: 0,
            y: -1.01,
            z: 5,
            ease: 'power2.inOut',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.section-3',
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 0.5
            }
          }
        )
        .fromTo(
          cameraTarget,
          { x: -4, y: 0, z: 0 },
          {
            x: 4,
            y: 0,
            z: 0,
            ease: 'power2.inOut',

            immediateRender: false,
            scrollTrigger: {
              trigger: '.section-3',
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 0.5
            }
          }
        )
    },
    { dependencies: [] }
  )

  return null
}

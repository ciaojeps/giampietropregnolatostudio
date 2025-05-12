import { Loader } from '@react-three/drei'
import ReactDOM from 'react-dom'
import Overlay from './Overlay/Overlay'
import Scene from './Scene'

ReactDOM.render(
  <>
    <Scene />
    <Overlay />
    <Loader />
  </>,
  document.getElementById('root')
)

// path: Underlay.tsx
import styled from "styled-components"
import React from "react"

const TopLeft = styled.div`
  position: absolute;
  top: 6vw;
  left: 6vw;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: min(10vw, 5em);
  line-height: 0.9em;
`

const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  left: 6vw;
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: min(15vw, 20em);
  line-height: 0.9em;
`

const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 6vw;
  font-family: "Inter";
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`

const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 6vw;
  font-family: "Inter";
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`

// Typizzazione prop vertical
type BarProps = {
  $vertical?: boolean
}

const Bar = styled.div<BarProps>`
  position: absolute;
top: ${(props) => (props.$vertical ? "0px" : "50%")};
  left: ${(props) => (props.$vertical ? "50%" : "0px")};
  width: ${(props) => (props.$vertical ? "2px" : "150px")};
  height: ${(props) => (props.$vertical ? "150px" : "2px")};
  background: #252525;
`

const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 8vw;
  right: 6vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #252525;
    margin-bottom: 6px;
  }
`

// Componente principale tipizzato
const Underlay: React.FC = () => {
  return (
    <>
      <TopLeft>
        <img 
                    src="/images/ice-PX-favicon.png" 
                    alt="Logo Studio" 
                    style={{ height: '60px', marginRight: '18px', display: "inline-block", verticalAlign: "middle" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/000000/FFFFFF?text=Logo'; }} // Fallback
                />
        <br />
        
      </TopLeft>
      <BottomLeft></BottomLeft>
      <BottomRight>
        2025
        <br />
        <strong>Giampietro Pregnolato</strong><br />
        Dev Studio<br />
        hello[at]giampietropregnolato.com<br />
      </BottomRight>
      <LeftMiddle><del>projects</del></LeftMiddle>
     {/*<Hamburger>
        <div />
        <div />
        <div />
      </Hamburger>*/}
      <Bar />
      <Bar $vertical />
    </>
  )
}

export default Underlay

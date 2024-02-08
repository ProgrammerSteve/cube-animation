import WAVES from 'vanta/src/vanta.waves.js'
import React,{useEffect,useRef,useState} from 'react'
export default function VantaBg({children}){

    const [vantaEffect, setVantaEffect] = useState(null)
    const myRef = useRef(null)
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(WAVES({
          el: myRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0,
          shininess: 17.00,
          waveHeight: 11.50,
          waveSpeed: 0.50,
          zoom: 0.82
        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy()
      }
    }, [vantaEffect])
 
    return(<>
    <div className='bg' ref={myRef}>{children}</div>
    </>)
}
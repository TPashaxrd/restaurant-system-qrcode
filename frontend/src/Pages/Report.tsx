import { useEffect } from 'react'

const Report = () => {

    useEffect(() => {
      const verifyRep = localStorage.getItem('verified') == 'true';
      if (verifyRep) {
        console.log("Verified!", verifyRep)
      } else {
        window.history.back()
      }
    })

  return (
    <div>
      
    </div>
  )
}

export default Report;
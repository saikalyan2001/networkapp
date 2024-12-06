import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const PageLayout = ({children}) => {
  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default PageLayout

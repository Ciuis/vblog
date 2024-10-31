import React from 'react'

import './Module.css';
import '../../assets/global.css'

interface ModuleProperties {
  children: JSX.Element
}

export const Module:React.FC<ModuleProperties> = (props:ModuleProperties) => {
  return (
    <div className='module-overlay'>
        <div className="module-container bg-color">
          {props.children}
        </div>
    </div>
  )
}
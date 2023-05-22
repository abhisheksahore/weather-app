import React from 'react'

const DisplayCard = (props) => {
  return (
    <div className='display-card-container' style={props.renderData.style}>
        {
            props.renderData.component
        }
    </div>
  )
}

export default DisplayCard
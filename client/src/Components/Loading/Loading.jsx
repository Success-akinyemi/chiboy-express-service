import './Loading.css'

function Loading({width, height}) {
  return (
    <div className='loading-card'>
        <div className="loading" style={{ width: `${width}px`, height: `${height}px` }}>

        </div>
    </div>
  )
}

export default Loading
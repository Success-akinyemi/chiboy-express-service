import './VehicleCategory.css'

function VehicleCategory() {
  return (
    <div className='vehicleCategory'>
        <div className="top">
            <h1>Add New Category</h1>
        </div>

        <div className="inputgroup">
            <label htmlFor="">Enter new vehicle Category</label>
            <input type="text" />
        </div>

        <button >Create</button>
    </div>
  )
}

export default VehicleCategory
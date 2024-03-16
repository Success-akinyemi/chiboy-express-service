import { useState } from 'react'
import './VehicleCategory.css'
import { newVehicleCategory } from '../../helper/api'

function VehicleCategory() {
  const [cat, setCat] = useState('')
  const [loading, setLaoding] = useState(false)

  const handleNewCat = async () => {
    try {
      setLaoding(true)
      const res = await newVehicleCategory(cat)
    } catch (error) {
      console.log('FAILED TO CREATE CAT', error)
    } finally{
      setLaoding(false)
    }
  }

  return (
    <div className='vehicleCategory'>
        <div className="top">
            <h1>Add New Category</h1>
        </div>

        <div className="inputgroup">
            <label htmlFor="">Enter new vehicle Category</label>
            <input type="text" required value={cat} onChange={(e) => setCat(e.target.value)} />
        </div>

        <button disabled={loading} onSubmit={handleNewCat} >{loading ? 'Creating' : 'Create'}</button>
    </div>
  )
}

export default VehicleCategory
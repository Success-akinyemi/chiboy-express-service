import { useState } from 'react'
import './VehicleCategory.css'
import { newVehicleCategory } from '../../helper/api'
import toast from 'react-hot-toast'

function VehicleCategory() {
  const [category, setCategory] = useState('')
  const [loading, setLaoding] = useState(false)

  const handleNewCat = async (e) => {
    e.preventDefault()
    console.log('ME')
    try {
      if(!category){
        toast.error('Enter a Valid input')
        return
      }
      setLaoding(true)
      const res = await newVehicleCategory({category})
    } catch (error) {
      console.log('FAILED TO CREATE CAT', error)
    } finally{
      setLaoding(false)
    }
  }

  return (
    <form className='vehicleCategory' onSubmit={handleNewCat}>
        <div className="top">
            <h1>Add New Category</h1>
        </div>

        <div className="inputgroup">
            <label htmlFor="">Enter new vehicle Category</label>
            <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <button disabled={loading}>{loading ? 'Creating' : 'Create'}</button>
    </form>
  )
}

export default VehicleCategory
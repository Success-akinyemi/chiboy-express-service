import { useState } from 'react'
import { usefetchVehicleType } from '../../hooks/fetch.hooks'
import './EditVehicleCategory.css'
import toast from 'react-hot-toast'
import { updateVehicleCategory } from '../../helper/api'

function EditVehicleCategory({vehicleCatId}) {
    const {isloaidngVehicleCat, vehiclecCatData} = usefetchVehicleType(vehicleCatId)
    console.log('first', vehiclecCatData?.data)
    const [ newCategory, setNewCategory ] = useState('')
    const [ updating, setUpdating ] = useState(false)

    const handleVehicleCatUpdate = async (e) => {
      e.preventDefault()
      if(newCategory === ''){
        toast.error('Invalid/Empty input')
        return
      }
      if(newCategory === vehiclecCatData?.data?.category){
        toast.error('No changes made')
        return
      }
      try {
        setUpdating(true)
        const res = await updateVehicleCategory({ vehicleCatId, newCategory })
      } catch (error) {
        console.log('UNABLE TO UPDATE VEHICLE CATEGORY', error)
      } finally {
        setUpdating(false)
      }
    }

  return (
    <div className='editVehicleCategory'>
        <small><b>ID: {vehicleCatId}</b></small>
        <form className="inputGroup" onSubmit={handleVehicleCatUpdate}>
          <label>Current Category</label>
          <input type="text" disabled defaultValue={vehiclecCatData?.data?.category} />
          <label>Update Category</label>
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button className={updating || newCategory === '' ? 'active' : '' } disabled={updating || newCategory === '' } >
            {updating ? 'Updating...' : 'Update' }
          </button>
        </form>
    </div>
  )
}

export default EditVehicleCategory
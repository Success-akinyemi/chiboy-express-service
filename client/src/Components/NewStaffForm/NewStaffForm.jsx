import './NewStaffForm.css'

function NewStaffForm({ staffId }) {
  return (
    <div className='newStaffForm'>
        {
            staffId ? (
                <div>
                    ID: {staffId}
                </div>
            ) : (
                <div>
                    NO ID
                </div>
            )
        }
    </div>
  )
}

export default NewStaffForm
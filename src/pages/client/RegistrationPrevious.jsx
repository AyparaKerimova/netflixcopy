import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationPrevious = () => {
  return (
    <>
        <nav className='flex items-center justify-between'>
        <img
          className="ml-4"
          width="200"
          height="200"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
        <Link to="/client/login" className='mr-20 text-xl font-medium'><h5>Sign In</h5></Link>
        </nav>
        <hr />
        <div className='flex flex-col items-center justify-center mt-48 text-center gap-4'>
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png" alt="" width={400} height={300}/>
            <p className='mt-4'>STEP 1 OF 3</p>
            <h2 className='text-3xl font-semibold w-74'>Finish setting up your account</h2>
            <p className='w-80 text-lg'>Netflix is personalized for you. Create a password to watch on any device at any time.</p>
            <Link to="/client-registration" className='bg-red-600 text-white px-44 py-6 rounded'>Next</Link>
        </div>
    </>
  )
}

export default RegistrationPrevious
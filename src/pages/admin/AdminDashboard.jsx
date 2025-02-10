import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (<>
  <div className='ml-12'>
  <div className='flex gap-2 mt-6'>
    <Link to="/admin/add-movie" className='bg-red-600 text-white px-12 py-3 rounded'>Add Movie</Link>
    <Link to="/admin/add-serie" className='bg-black text-white px-12 py-3 rounded'>Add Serie</Link>
  </div>
    <h1 className='text-4xl font-semibold'>Movies</h1>
    ...
    <h1 className='text-4xl font-semibold'>Series</h1>
    ...
    </div>
  </>);
};

export default AdminDashboard;

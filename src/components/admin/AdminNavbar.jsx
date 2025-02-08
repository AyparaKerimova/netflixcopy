import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <>
    <header>
        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>

        </nav>
      </header>
    </>
  )
}

export default AdminNavbar
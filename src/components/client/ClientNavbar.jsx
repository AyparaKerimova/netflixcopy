import React from 'react'
import { Link } from 'react-router-dom'

const ClientNavbar = () => {
  return (
    <>
        <header>
        <nav>
          <Link to="/client/dashboard">Dashboard</Link>
        </nav>
      </header>
    </>
  )
}

export default ClientNavbar
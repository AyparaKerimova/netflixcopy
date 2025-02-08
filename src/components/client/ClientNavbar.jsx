import React from 'react'

const ClientNavbar = () => {
  return (
    <>
        <header>
        <nav>
          <Link to="/client/dashboard">Dashboard</Link>
          <Link to="/home">Home</Link>
        </nav>
      </header>
    </>
  )
}

export default ClientNavbar
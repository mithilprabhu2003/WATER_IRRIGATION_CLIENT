import React from 'react'
import Header from '../components/Header'
import LeftSidebar from '../components/LeftSidebar'
import MiddleSidebar from '../components/MiddleSidebar'
import RightSidebar from '../components/RightSidebar'
import LogoutUser from '../components/LogoutUser'
function Home() {

  return (
    <div>
      <Header />
      <div className="grid grid-cols-4 grid-rows-1">
        <LeftSidebar />
        <MiddleSidebar />
        {/* <RightSidebar /> */}
      </div>
      <LogoutUser />
    </div>
  )
}

export default Home

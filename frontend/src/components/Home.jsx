import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '../api/user.config'
import Navigate from './navigation/Navigate'
function Home() {

  return (
    <>
      <Navigate />

      
    </>
  );
}

export default Home;
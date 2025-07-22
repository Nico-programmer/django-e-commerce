import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getUser } from '../api/user.config'
// Components
import Navigate from './navigation/Navigate'
import Start from './navigation/Start'
function Home() {

  return (
    <>
      <Navigate />

      <Start />
    </>
  );
}

export default Home;
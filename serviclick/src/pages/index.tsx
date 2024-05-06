import type { NextPage } from "next";

import {useUser} from '../store/hooks'

import SignIn from '../components/functional/SignIn/SignIn'
import { Dashboard } from "~/components/functional/Dashboard/Dashboard";

const Home: NextPage = () => {

  const {user} = useUser()
  console.log(user.email)

  return user.email ? <Dashboard /> : <SignIn/>;
};

export default Home;
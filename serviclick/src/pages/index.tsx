import type { NextPage } from "next";

import {useUser} from '../store/hooks'

import SignIn from '../components/functional/SignIn/SignIn'
import { Dashboard } from "~/components/functional/Dashboard/Dashboard";

const Home: NextPage = () => {

  const {user} = useUser()

  return user.email && user.roles && user.roles.filter(role => role.name === "admin").length > 0 ? <Dashboard /> : <SignIn/>
};

export default Home;
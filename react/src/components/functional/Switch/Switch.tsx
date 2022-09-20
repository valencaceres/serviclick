import { useAppSelector } from "../../../redux/hooks";

import Main from "../Main";
import Login from "../Login";

const Switch = () => {
  const { user } = useAppSelector((state) => state.userSlice);

  return user.name ? <Main /> : <Login />;
};

export default Switch;

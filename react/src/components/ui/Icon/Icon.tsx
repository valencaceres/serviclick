import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";

export enum icons {
  faBars = "faBars",
  faUser = "faUser",
  faHome = "faHome",
  faCog = "faCog",
  faCarSide = "faCarSide",
  faFileInvoiceDollar = "faFileInvoiceDollar",
  faChevronLeft = "faChevronLeft",
  faChevronRight = "faChevronRight",
  faSearch = "faSearch",
  faPlus = "faPlus",
  faXmark = "faXmark",
  faPen = "faPen",
  faTrashAlt = "faTrashAlt",
  faArrowCircleUp = "faArrowCircleUp",
  faIninity = "faInfinity",
  faSave = "faSave",
  faSignInAlt = "faSignInAlt",
  faWarning = "faWarning",
  faInfo = "faInfo",
  faSpinner = "faSpinner",
}

type IconT = {
  iconName: icons;
  className?: string;
  onClick?: any;
};

const Icon = ({ iconName, className, onClick }: IconT) => {
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={icon[iconName]} />
    </div>
  );
};

export default Icon;

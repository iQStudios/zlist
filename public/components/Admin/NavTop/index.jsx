import moment from "moment";

import LogoutIcon from "../../../img/SVG/logout";
import CalendarIcon from "../../../img/SVG/calendar";

const ButtonList = [
  {
    id: 1,
    title: "logout",
    icon: "logout",
  },
  {
    id: 2,
    title: "calendar",
    icon: "calendar",
  },
];

export default function NavTop(props) {
  return (
    <div className=" h-auto w-full flex flex-wrap justify-between ">
      <div>
        <h3 className="text-3xl xl:text-4xl capitalize font-bold font-openSans">
          {props.title}
        </h3>
      </div>
      {ButtonList.map((item) => (
        <div
          key={item.id}
          className={`${
            item.id === 2 && " hidden md:block p-2"
          } w-auto h-16 inline-flex items-center px-2`}
        >
          {item.id === 1 && (
            <span className="text-gray-400 mr-2 md:mr-10  text-md md:text-lg font-medium font-openSans">
              {moment(new Date()).format("LL")}
            </span>
          )}
          {item.id === 1 ? (
            <div className="p-3 rounded-full bg-white shadow-3xl inline-flex items-center ">
              <CalendarIcon w="6" h="6" />
            </div>
          ) : (
            <button
              className="p-3 rounded-full bg-white shadow-3xl inline-flex items-center "
              onClick={props.signOut}
            >
              <LogoutIcon w="6" h="6" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

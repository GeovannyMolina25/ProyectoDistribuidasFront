import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebarClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  isSidebarOpen,
  handleSidebarClose,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside
      onBlur={handleSidebarClose}
      id="default-sidebar"
      className={`transition-transform -translate-x-full sm:translate-x-0 max-w-72 w-full h-full absolute z-50 md:relative
    ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-96"
    } bg-sideImage bg-cover bg-no-repeat bg-center rounded-md
`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-transparent dark:bg-gray-800">
        {isSidebarOpen && (
          <div
            className="flex justify-end text-white "
            onClick={handleSidebarClose}
          >
            <svg
              className="w-8 h-8 cursor-pointer text-white transition duration-75 bg-white rounded-full p-2  hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </div>
        )}

        <ul className="space-y-2 font-medium mt-4">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group"
            >
              <svg
                className="w-5 h-5  transition duration-75 text-white group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/registro"
              className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 transition duration-75 text-white group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                Registro de Combustible
              </span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 rounded-lg text-white hover:bg-white hover:text-black group w-full"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Cuadros Estadisticos
              </span>
              <svg
                onClick={handleToggleDropdown}
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul
              id="dropdown-example"
              className={`py-2 space-y-2 transition-all duration-300 ease-in-out:
        ${isDropdownOpen ? "block" : "hidden"}
      `}
            >
              <li>
                <Link
                  to="/reporte/promedio"
                  className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-white text-white hover:text-black"
                >
                  Promedio diario de consumo
                </Link>
              </li>
              <li>
                <Link
                  to="/reporte/historico"
                  className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group hover:bg-white text-white hover:text-black"
                >
                  Historico de vehiculos Recorridos
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

import { FC, useState } from "react";
import { Sidebar } from "../components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="w-[calc(100wh-24px)] md:flex md:gap-3 relative h-[calc(100vh-24px)] my-3 mx-3 p-0">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarClose={handleSidebarClose}
      />
      <div className=" bg-gray-200 rounded-md w-full h-full">
        <button
          onClick={handleSidebarOpen}
          type="button"
          className="inline-flex items-center p-2 ms-3 text-sm text-blak rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6 text-black"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>{" "}
        {children}
      </div>
    </div>
  );
};

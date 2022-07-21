import { Sidebar, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiArrowSmRight,
  HiTable
} from 'react-icons/hi';

export default function AdminSide({ isAdmin, setIsAdmin,  router }) {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      if (router.pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    }
  }, [setIsAdmin, router]);

  if (isAdmin == undefined) {
    return (
      <main className="h-[calc(100vh)] flex flex-col sm:flex-row sm:items-center justify-center overflow-y-auto">
        <Spinner
          size="xl"
        />
      </main>
    );
  }

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-black items-center cursor-pointer fixed left-5 top-2 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed z-30 flex items-center cursor-pointer left-5 top-2 text-black"
          fill="#2563EB"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}
      <div
        className={`top-0 right-full w-fit bg-blue-600  text-white fixed h-full z-40  ease-in-out duration-300 ${!showSidebar ? "translate-x-0 " : "translate-x-full"
          }`}
      >
        <div className="w-fit bg-gray-50 h-[100vh] pt-8">
          <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="#"
                  icon={HiChartPie}
                  onClick={() => {
                    router.push("/admin/productos");
                    setShowSidebar(false);
                  }}
                >
                  Productos
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  icon={HiViewBoards}
                  labelColor="alternative"
                  onClick={() => {
                    router.push("/admin/entrenadores");
                    setShowSidebar(false);
                  }}
                >
                  Entrenadores
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  icon={HiInbox}
                  label="3"
                  onClick={() => {
                    router.push("/admin/pedidos");
                    setShowSidebar(false);
                  }}
                >
                  Pedidos
                </Sidebar.Item>
                <Sidebar.Item
                  href="#"
                  icon={HiUser}
                  onClick={() => {
                    router.push("/admin/productos");
                    setShowSidebar(false);
                  }}
                >
                  Usuarios
                </Sidebar.Item>
                {isAdmin && (<Sidebar.Item
                  icon={HiArrowSmRight}
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("admin");
                    router.push("/admin/login");
                    setShowSidebar(false);
                  }}
                  color="failure"
                >
                  Cerrar sesión
                </Sidebar.Item>)}
                {!isAdmin && (<Sidebar.Item
                  href="#"
                  icon={HiArrowSmRight}
                  onClick={() => {
                    router.push("/admin/login");
                    setShowSidebar(false);
                  }}
                >
                  Login
                </Sidebar.Item>)}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </div>
    </>
  )
}
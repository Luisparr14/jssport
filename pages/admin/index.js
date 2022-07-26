import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSide from "../../components/admin/AdminSideBar";
//Index
export default function Admin() {

  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      router.push("/admin/productos");
    } else {
      setIsAdmin(false);
      router.push("/admin/login");
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
      <AdminSide
        isAdmin={isAdmin}
        router={router}
        setIsAdmin={setIsAdmin}
      />
    </>
  )
}

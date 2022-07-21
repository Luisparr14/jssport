import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginFormAdmin from "../../components/admin/loginFormAdmin";
import AdminSide from "../../components/admin/AdminSideBar";
import axios from "axios";
import CustomAlert from "../../components/CustomAlert";
import Swal from "sweetalert2";

const initialState = {
  correo: "",
  contrasena: ""
}

export default function AdminLogin() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [adminData, setAdminData] = useState(initialState);


  useEffect(() => {
    const session = localStorage.getItem("admin");
    if (session) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
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

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/auth/inicio-sesion", adminData);
      const { data } = response;
      if (data.ok) {
        const {data: admin} = data;
        console.log(admin);
        localStorage.setItem("admin", JSON.stringify(admin));
        Swal.fire({
          title: `${data.message}`,
          text: `Bienvenido`,
          icon: 'success'
        })
        router.push("/admin/productos");        
      }
    } catch (error) {
      console.log(error);
      const { response } = error;
      const { data } = response;
      Swal.fire({
        title: 'Error',
        text: data.message,
        icon: 'error'
      })
    }
  }


  return (
    <main className="h-[calc(100vh)] flex flex-col sm:items-center justify-center overflow-y-auto">
      <AdminSide
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        router={router}
      />
      <div className="mx-auto rounded-3xl p-5 max-w-xs my-3 sm:my-px first-line:shadow-sm bg-white">
        <LoginFormAdmin
          adminData={adminData}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </div>
    </main>
  );
}
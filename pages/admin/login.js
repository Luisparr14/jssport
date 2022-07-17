import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginFormAdmin from "../../components/admin/loginFormAdmin";
import AdminSide from "../../components/admin/AdminSideBar";
import axios from "axios";
import CustomAlert from "../../components/CustomAlert";

const initialState = {
  correo: "",
  contrasena: ""
}

export default function AdminLogin() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [adminData, setAdminData] = useState(initialState);

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");
  
  const resetAlert = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertTitle("");
      setAlertMessage("");
      setAlertType("failure");
    }, 3000);
  }

  useEffect(() => {
    const session = localStorage.getItem("admin");
    if (session) {
      setIsAdmin(true);
      router.push("/admin/productos");
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
        localStorage.setItem("admin", JSON.stringify(admin));
        setAlertTitle("Inicio de sesión");
        setAlertMessage(data.message);
        setAlertType("success");
        setAlert(true);
        resetAlert();
        setTimeout(() => {
          setIsAdmin(true);
          router.push("/admin/productos");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      const { response } = error;
      const { data } = response;
      setAlertTitle("Error");
      setAlertMessage(data.message);
      setAlertType("failure");
      setAlert(true);
      resetAlert();
    }
  }


  return (
    <main className="h-[calc(100vh)] flex flex-col sm:items-center justify-center overflow-y-auto">
      {alert && (
        <CustomAlert
          titulo={alertTitle}
          mensaje={alertMessage}
          tipo={alertType}
        />
      )}
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
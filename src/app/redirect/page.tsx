"use client";
import AnimatedDots from "@/components/animated-dots";
import { useAddStudentMutation } from "@/rtk";
import { useEffect } from "react";
import { toast } from "sonner";
import { authorizeUser } from "../_actions/handleSubmitForm";

function Redirect() {
  const [addStudent] = useAddStudentMutation();
  useEffect(() => {
    async function getAuth() {
      try {
        const { isAuth, user } = await authorizeUser();

        if (!isAuth) {
          window.location.assign("/login");
        }
        const { data } = await addStudent({
          firstname: user.given_name || "Unonymous",
          email: user.email || "johndoe@gmail.com",
          picture: user?.picture,
        });

        console.log("Yoo mkuu", data);
        if (data?.exist && data.student.InstitutionGroup?.id) {
          window.location.assign(`/dashboard/${data?.student.id}`);
        } else {
          localStorage.setItem("newstudent", JSON.stringify(data?.student));
          window.location.assign(`/institutions`);
        }
      } catch (error) {
        toast.error("Authentication failed");
        console.error(error);
        // window.location.assign("/login");
      }
    }
    getAuth();
  }, [addStudent]);
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-blue-500">
      <div className="text-[50px] text-purple-800 flex items-center justify-center p-0 m-0">
        <span> Redirecting</span>
        <span className="self-end">
          <AnimatedDots />
        </span>
      </div>
    </div>
  );
}

export default Redirect;

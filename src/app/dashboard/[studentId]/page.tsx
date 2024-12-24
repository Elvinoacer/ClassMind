import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import DashboardScreen from "@/screens/dashboard";
import { dummyExample, storeUserDetails } from "../userDetails";

async function Dashboard({ params }) {
  const { studentId } = await params;
  console.log(studentId);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if (!user.id) return redirect("/");
  // storeUserDetails(user);

  console.log(typeof dummyExample);

  return (
    <>
      <DashboardScreen studentId={studentId} />
    </>
  );
}

export default Dashboard;

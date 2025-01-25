import DashboardScreen from "@/screens/dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function Dashboard({
  params,
}: {
  params: Promise<{
    studentId: string;
  }>;
}) {
  const { studentId } = await params;

  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (!isAuth) return redirect("/login");

  return (
    <>
      <DashboardScreen studentId={studentId} />
    </>
  );
}

export default Dashboard;

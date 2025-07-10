import Image from "next/image";
import DashboardPage from "./dashboard/dashboard";
import Homepage from "./homepage/page";
import Link from 'next/link';   

export default function Home() {
  return (
    <div>
      <DashboardPage />
    </div>
  );
}

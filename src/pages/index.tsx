import { Inter } from "@next/font/google";
import Auth from "../components/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Auth></Auth>;
}

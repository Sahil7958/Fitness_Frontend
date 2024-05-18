"use client"
import styles from "./page.module.css";
import Homebanner1 from "@/Components/Homebanner1/Homebanner1";
import Homebanner2 from "@/Components/Homebanner2/Homebanner2";

export default function Home() {
  return (
    <main  className={styles.main}>
      <Homebanner1/>
      <Homebanner2/>
    </main>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Prisma/TimescaleDB segmentation fault
        </h1>

        <p className={styles.description}>
          <button
            onClick={async () => {
              const res = await fetch("/api/pg-client-check");
              console.log(await res.json());
            }}
          >
            Connect using node-pg (Works fine)
          </button>
        </p>
        <p className={styles.description}>
          <button
            onClick={async () => {
              const res = await fetch("/api/prisma-check");
              console.log(await res.json());
            }}
          >
            Connect using Prisma (SegFault if running inside container)
          </button>
        </p>
      </main>
    </div>
  );
};

export default Home;

import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Product API Dashboard</title>
        <meta name="description" content="Manage products using Next.js + Prisma API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className={styles.title}>Welcome to Your Product API</h1>
          <p className={styles.description}>
            You are now running a Next.js + Prisma API for product management.
          </p>

          <section className={styles.section}>
            <h2>🔗 Test API Endpoints</h2>
            <ul className={styles.links}>
              <li>
                👉 <a href="/api/products" target="_blank" rel="noopener noreferrer">
                  GET /api/products
                </a> – List all products
              </li>
              <li>
                👉 <a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer">
                  POST /api/products
                </a> – Create a new product using Postman
              </li>
              <li>
                👉 <code>GET /api/products/[id]</code>, <code>PUT</code>, <code>DELETE</code> – Work with specific product ID
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>📚 Useful Links</h2>
            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card} target="_blank" rel="noreferrer">
                <h3>Next.js Docs →</h3>
                <p>Learn about Next.js features and API.</p>
              </a>
              <a href="https://www.prisma.io/docs" className={styles.card} target="_blank" rel="noreferrer">
                <h3>Prisma Docs →</h3>
                <p>Understand how to use Prisma with your DB.</p>
              </a>
              <a href="https://vercel.com" className={styles.card} target="_blank" rel="noreferrer">
                <h3>Deploy with Vercel →</h3>
                <p>Deploy your Next.js app in seconds.</p>
              </a>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Product API. Built with Next.js.</p>
        </footer>
      </div>
    </>
  );
}

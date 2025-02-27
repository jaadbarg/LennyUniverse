import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Lenny Universe - A Journey of Blissful Growth</title>
        <meta name="description" content="Embark on a journey of blissful growth with Lenny Universe. Mindfulness, personal growth, and authentic connection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <div className="psychedelic-bg"></div>
        <Navbar />
        <AnimatePresence mode="wait">
          <main className="flex-grow" key={router.route}>
            <Component {...pageProps} />
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
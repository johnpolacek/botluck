import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import App from "../components/App";
import Footer from "../components/Footer";
import { AppContextProvider } from "../components/AppContext";

const Home: NextPage = () => {

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>BotLuck - Group Pot Luck Dinner Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AppContextProvider>
        <App />
      </AppContextProvider>
      <Footer />
    </div>
  );
};

export default Home;

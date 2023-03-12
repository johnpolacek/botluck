import Document, { Head, Html, Main, NextScript } from "next/document"

// dark background texture
// background - color: #380b00;
// background - image: url("https://www.transparenttextures.com/patterns/debut-light.png");

// light background texture
// background - color: #d1925a;
// background - image: url("https://www.transparenttextures.com/patterns/green-cup.png");
// /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" style={{ fontSize: "20px" }}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Pot Luck Dinner Generator powered by AI"
          />
          <meta property="og:site_name" content="BotLuck" />
          <meta
            property="og:description"
            content="Pot Luck Dinner Generator powered by AI"
          />
          <meta property="og:title" content="BotLuck" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="BotLuck - Pot Luck Dinner Generator"
          />
          <meta
            name="twitter:description"
            content="BotLuck is a Pot Luck Dinner Generator powered by AI"
          />
          <meta
            property="og:image"
            content="https://BotLuck.fun/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://BotLuck.fun/og-image.png"
          />
        </Head>
        <body className="bg-[#d1925a] bg-[url('/background.png')]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

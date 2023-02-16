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
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your next Twitter bio in seconds."
          />
          <meta property="og:site_name" content="twitterbio.com" />
          <meta
            property="og:description"
            content="Generate your next Twitter bio in seconds."
          />
          <meta property="og:title" content="Twitter Bio Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Twitter Bio Generator" />
          <meta
            name="twitter:description"
            content="Generate your next Twitter bio in seconds."
          />
          <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
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

import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/Banner';
import NavBar from '../components/nav/Navbar';
import SectionCards from '../components/card/SectionCards';
import { getVideos, getPopularVideos } from '../lib/videos';

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavBar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          {/* <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small" /> */}
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailer');
  const travelVideos = await getVideos('travel');
  const productivityVideos = await getVideos('productivity');
  const popularVideos = await getPopularVideos();

  return { props: { disneyVideos, travelVideos, productivityVideos, popularVideos } };
}

import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '@/lib/posts-utils';

function HomePage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>Tommy's Blog</title>
        <meta name='description' content='I post about programming and web development.' />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  // const featuredPosts = [
  //   {
  //     title: 'blog',
  //     image: 'getting-started-nextjs.png',
  //     excerpt: 'text',
  //     date: '2020/05/30',
  //     slug: 'getting-started',
  //   },
  //   {
  //     title: 'blog2',
  //     image: 'getting-started-nextjs.png',
  //     excerpt: 'text22',
  //     date: '2020/06/30',
  //     slug: 'getting-started2',
  //   },
  // ];
  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;

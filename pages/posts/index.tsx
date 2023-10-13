import Head from 'next/head';
import { Fragment } from 'react';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-utils';

function AllPostsPage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name='description' content='A list of all programming-related tutorials and posts!' />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  // const allPosts = [
  //   {
  //     title: 'post',
  //     image: 'nextjs-file-based-routing.png',
  //     excerpt: 'text',
  //     date: '2020/05/30',
  //     slug: 'getting-started',
  //   },
  //   {
  //     title: 'post2',
  //     image: 'nextjs-file-based-routing.png',
  //     excerpt: 'text22',
  //     date: '2020/06/30',
  //     slug: 'getting-started2',
  //   },
  // ];
  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;

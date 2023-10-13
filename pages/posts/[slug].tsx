import Head from 'next/head';
import { Fragment } from 'react';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/posts-utils';

function PostDetailPage(props: any) {
  // const props = {
  //   post: {
  //     title: 'blog',
  //     image: 'getting-started-nextjs.png',
  //     excerpt: 'text',
  //     date: '2020/05/30',
  //     slug: 'getting-started',
  //     content: '# This is a first post',
  //   },
  // };

  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
      {/* <PostContent /> */}
    </Fragment>
  );
}

export function getStaticProps(context: any) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName: any) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug: any) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;

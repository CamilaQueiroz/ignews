import Prismic from "@prismicio/client";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";

import styles from "./styles.module.scss";
import Link from "next/link";
import React from "react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <React.Fragment key={post.slug}>
              <Link href={`/posts/preview/${post.slug}`}>
                <a>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    const excerpt =
      post.data.content
        .find((content) => content.type === "paragraph")
        ?.text?.replace("\n\n", "") ?? "";

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
      createdAt: post.first_publication_date,
    };
  });

  const sortedPosts = posts.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return {
    props: {
      posts: sortedPosts,
    },
    revalidate: 60 * 360, //6 hours
  };
};

import { useRouter } from "next/router";
import React from "react";
const Persondetails = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <h1>{data.body}</h1>
    </div>
  );
};
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } }, // See the "paths" section below
    ],
    fallback: true, // See the "fallback" section below
  };
}
export async function getStaticProps(context) {
  const { params } = context;

  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const data = await result.json();
  return {
    props: { data },
  };
}
export default Persondetails;

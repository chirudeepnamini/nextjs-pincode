import Link from "next/link";
const postlist = ({ posts }) => {
  return (
    <div>
      {posts.map((person) => {
        return (
          <div key={person.id}>
            <Link href={`/posts/${person.id}`}>
              <a>
                {person.id}---{person.title}
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts: data.slice(0, 50) }, // will be passed to the page component as props
  };
}
export default postlist;

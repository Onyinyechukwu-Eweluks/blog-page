import Link from "next/link";

const Index = () => {
  return (
    <>
      <h1>Index page</h1>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </>
  );
};

export default Index;

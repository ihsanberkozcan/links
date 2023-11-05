import Nav from "./Nav";

export default function AccessDenied() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-col flex-1 flex justify-center w-full h-max font-sans items-center">
        <h2 className="text-6xl font-semibold">Access Denied</h2>
        <a
          className="text-2xl font-medium mt-4 text-blue-400 underline decoration-blue-400"
          href="/"
        >
          Home
        </a>
      </div>
    </div>
  );
}

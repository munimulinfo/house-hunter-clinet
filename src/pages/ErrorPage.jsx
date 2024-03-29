import { Link, useRouteError } from "react-router-dom";
export function ErrorPage() {
  const { error } = useRouteError();

  return (
    <div
      id="notfound"
      className="flex justify-center flex-col h-screen items-center"
    >
      <h1 className="uppercase font-serif text-4xl">Page Is Not found</h1>
      <div className="notfound max-w-lg w-full text-center leading-4 ">
        <div className="notfound-404 h-36 md:h-64">
          <h1 className="md:text-[200px] text-9xl font-bold m-0 text-title-color font-nunito">
            4<span />4
          </h1>
        </div>
        <div className="space-y-4 mb-4">
          <h2 className="text-lg md:text-2xl  font-bold m-0 uppercase text-[#232323]">
            Oops! Page Not Be Found
          </h2>
          <p className=" text-[#ef4444] font-medium md:text-2xl ">
            <i>{error?.statusText || error?.message}</i>
          </p>
        </div>
        <Link className="btn btn-error rounded-full" to="/">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(user);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-200 border-gray-400 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <a className="flex items-center">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAAvVBMVEX///8AAAAREiTa2ts2NjZ6enppaWl3d3dHR0dBQUGAgICzs7ODg4MrKyvk5OSGhob4+PikpKTLy8uSkpJxcXEAABqMjIwfHx8AABfl5eVubm6UlJQAABwAABMLDCAMDAwVFRWUlJopKjhAQUsiIiKmpqacnKB+f4fV1dkUFSZqanJzc3sAAB9JSlRhYWsAAA6Hh47AwMBhYWFUVFQ0M0BZWWE3OUYeHy1NUFkhIjChoKevr7UsLjxhZGpCQk7rZpk0AAAGMUlEQVR4nO2dC3uaPBiGDax137oe5obFFlLRtghMTDcRax3//2d9aJSDoVScgcS993V5SGxr7ut9EoLWttUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAY2u2mR8CHM4TOmh4DD2KvkzT7gtZ8aXocx6aNNpxYzc4QKjC7uf+epfvS3AAPJOOVTePNA8rxtcEhHkQ7P/6kZje3+QeumxzkAZwhVGwmuVji9bBrJrdYmsMrdcdMarG0XmqrtWMms1haL3XVzJtJLLbjtWMmr1ji9aBuu7Jm0oox9VqRNXuUU6zQK2t2dymlWEEOKSp6BznE2Hq1tzuO98ykEGO9ztL97ztmMoixOVz3lNdMArHCeq0orZn4Ypn94aYn2VmVmQkvlubwarenNI2ii7Hzq/AMmjUTXKwkhx+YiS32oyyHlO0rwrtmQou9s86vuP/+Qc1EFkvqxeaw22pdl5sJLFaSw+6q1d22CtdGccUSiz6Twy5tX5eZCStWnkNKUrOCNHbZHykErNduvVaUpPFX3SPej8QryeGPAq+MWbLqP+z2CMU+OaSUpPFHnSPej/1ySGHSeCWu2b45pMiTxrsK9VohSxqr5JAiRxrTHF7t9nx/73tK0iiMWZrD9/YbRZQczwQxq55DiuhpTOpVIYeU5CxGyDSm+/kqOaSInMaq63wecdNYksP7fb6fSeNVksY7PiPej5J1fs9TEDFX/b/LIaUkjY3V7DypV2/Tk5julUNKksZthRo3O2S/UYRoaUzqxeawkpdoaUy8HrY5rLYeZmHXxubM2HU+6alYrxXMPFP7DaXxeDmkiJLG1Ovvc0gRI41J6m6ZHB7oJUYa2Rwets7nab5mx88hpWkzHjmksHuQfo1m6fHrmDmksGee9dWMVw4pzaUx8Tp6Din3DaUx3c8fP4eUZs48+eaQwpj1kic9P9Zz7MKef50f3as0jZzM2Bwed35tYVd9vmn8VUMOKSVrI4f3PDv33yjPW68uJ69MGrevnPSeN09+3zn2cxXQ5uWVmjXzZlmbm1eSxmY+RUfFPvP54f+B2PEBsUMQUqxzUZGCNVxIMeajix9RMH4hxb5UFSv4NC2IcQDEQCyDwGKfer2rlN4FdbjIdfY+ySiW7+xQsZ1DFojVCYitATEKiHEAxNaAGAXEOABia0CMIrTYTZatWK5TSrEKgFg9gBiIZQAxDnwg9vj0LcPTV+pwne99lFCs+AA9yvfKeBw74Z1HDhCjgBgHQGwNiFFAjAMgtgbEKCDGgWpiIyp2Apvg/t15lt9U7Heu864voVgFQKweQOzfFSv4nydCinVvLytxW/CHCYQUOwYgxgEQOwQQ4wCIHQKIcQDEDuFkxT43LnZ7zoV+42JcATEQAzG+NPM56OvLT5y5FPXPqQMAAAAAAAAAAAAAAAAAAAAAAAAAAAD/FuqJ0uL/Ow3N0FJOFBCTjY0Y3lyUzK2iaIaC09bqnpY2BYeK4RlW8CCk96fO5jE9CMzlbKvijLHyGkxlMaNihutrOtFNXdFNRBxsmho20dvb4sl7RiZCGCO0HCE0I5FcYjgkZmjblo1sy7OtpWV50WKuzhFye4E1Gg2i0Wj8EsW3s3rF4plAZ0l8rW1aOOmhX2A42MEG1uJrJ24bWTHFtBzX9XTPcxEiPy0FeV4wiTqq7VqDDvrz9jJDg95Iw7hWLzyeB8NXMwyH2kDDgT2f6gPNmQaOErfje2Go+4HtusS34hs/sHziEtfIiml+QOJ+1440k+Dnie6SsTFBhmpb4ws0u+hMzFjste4caoS4C5tEiyDO0ZwExPN84i/8ie3GNXizrKGH7CAYz4n+HPkmQWS8cLWsmIIXdkjwYGDh0Pdd37GCufHskU6kLlXvxbMu7GFnrE5qFjOJ7bm+NSTxlRfFF/LHW+mFsaVvW37gurYXTyPXCheR58/Hf1yb6Dkxww2NAfFwfJn4yCXhconnlq2bwfin5ZuTOJIe8oZ1l8xx9MhYLkNnaLzisb40InMwdQar20gbhOFMmc4jB0/DabSMltoSG8P8HIvN4umoa+uLphj6ajYZ8SoZH7mwGX+tZmKtmaMYXq8W2wVj3cKbe/TB9XqyRsHpUfjUdx6nB4jJxv9V3cSqKh1vhQAAAABJRU5ErkJggg=="
            className="h-6 mr-3 sm:h-9"
            alt="house Hunter Logo"
          />
          <span className="self-center text-emerald-500 text-xl font-semibold whitespace-nowrap dark:text-white">
            House Hunter
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <div className="hidden mt-2 mr-4 sm:inline-block">
            <span />
          </div>
          {user ? (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <FaUser className="w-full h-full bg-green-300 p-2"></FaUser>
              </div>
            </div>
          ) : (
            <button className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:bg-emerald-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-green-600 dark:hover:bg-emerald-500 focus:outline-none dark:focus:bg-emerald-500">
              <Link to="/login">Login</Link>
            </button>
          )}

          <button
            onClick={toggleMobileMenu}
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="true"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                className="block py-2 uppercase pl-3 pr-4 text-white  rounded lg:bg-transparent lg:text-emerald-500 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to={`/dashboard/${user?.role}`}
                  className="block uppercase py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  DashBoard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { clearDetail, setDetail } from "./redux/details";
import { useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

function App() {
  const { details, pincode } = useSelector((state) => state.setDetail);
  const [enteredPincode, setenteredPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.zippopotam.us/in/${enteredPincode}`
      );
      if (response.status == 200) {
        const result = await response.json();
        dispatch(
          setDetail({ details: result.places, pincode: result["post code"] })
        );
        setError(null);
      } else if (response.status == 404) {
        setError("Enter a Valid Pincode");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleInputChange = (event) => {
    setenteredPincode(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDetails();
  };

  return (
    <>
      <div className="flex items-center justify-center m-4">
        <form
          className="flex items-center w-[50%]"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <input
              type="text"
              id="pincode-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a postal code"
              value={enteredPincode}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 m-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            Search
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center flex-col">
        {loading ? (
          <>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
            <h1 className="text-2xl text-blue-500 font-semibold mb-4">
              Searching.....!!
            </h1>
          </>
        ) : error ? (
          <p className="text-white bg-red-500 p-4 rounded-md shadow-md">
            <span className="font-semibold">Error:</span> {error}
          </p>
        ) : (
          <>
            <div className="flex flex-wrap justify-around ">
              {details.map((location, index) => (
                <div
                  key={index}
                  className=" flex flex-col items-center bg-white shadow-md p-6 rounded-md m-4 w-96"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {location["place name"]}- {pincode}
                  </h3>

                  <p>
                    <span className="font-semibold">State:</span>{" "}
                    {location.state}
                  </p>
                  <p>
                    <span className="font-semibold">State Abbreviation:</span>{" "}
                    {location["state abbreviation"]}
                  </p>
                  <p>
                    <span className="font-semibold">Longitude:</span>{" "}
                    {location.longitude}
                  </p>
                  <p>
                    <span className="font-semibold">Latitude:</span>{" "}
                    {location.latitude}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  dispatch(clearDetail());
                }}
                className="inline-flex items-center py-2.5 px-3 m-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

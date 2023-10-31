"use client";
import Nav from "@/components/Nav";
import { Links, MyObjectType, datatype, userdatatype } from "@/types/types";
import { truncateText } from "@/utils/truncateText";

import { useEffect, useRef, useState } from "react";

export default function MyPage() {
  const mobile = useRef<any>(null);
  const [datas, setDatas] = useState<MyObjectType>();
  const [userData, setUserData] = useState<datatype>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const [mobileHeight, setMobileHeight] = useState<number>();
  const [urlDesc, setUrlDesc] = useState<string>();

  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emptyError, setEmptyError] = useState<string>("");
  useEffect(() => {
    fetchData();
    getUserData();
  }, []);
  useEffect(() => {
    if (userData?.username) {
      const mobileWidth = mobile?.current?.offsetWidth;
      if (mobile?.current) {
        const iframe = mobile?.current;
        iframe.onload = () => {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow.document;

          const divToHide = iframeDocument.getElementById("edit");

          if (divToHide) {
            divToHide.style.display = "none";
          }
        };
      }

      setMobileHeight(Math.floor(mobileWidth * 1.8));
    }
  }, [userData?.username, iframeKey]);

  const fetchData = async () => {
    const res = await fetch("/api/links");
    const data = await res.json();
    setDatas(data);
  };

  const getUserData = async () => {
    const res = await fetch("/api/user");
    const data: userdatatype = await res.json();
    setUserData(data);
  };
  const addUrl = async () => {
    if (!urlDesc && !url) {
      setEmptyError("Url Desciption and Url are empty");
    } else if (!urlDesc) {
      setEmptyError("Url Desciption is empty");
    } else if (!url) {
      setEmptyError("Url is empty");
    } else {
      const urlPattern =  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;;
      if (!urlPattern.test(url)) {
        setError("Invalid URL");
      } else {
        setError("");
        setUrlDesc("");
        setUrl("");
        const res = await fetch("/api/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urlDesc: urlDesc, url: url }),
        });
        if (res.status == 201) {
          const newData = datas?.links
            ? [...datas?.links, { urlDesc, url, clickNumber: 0 }]
            : [];

          setIframeKey(iframeKey + 1);
          setDatas({ links: newData });
        }
      }
    }
  };

  const updateDescription = async () => {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc: userData.desc }),
    });
    if (res.status == 201) {
      setIframeKey(iframeKey + 1);
    }
  };

  const deleteLink = async (index: number) => {
    const res = await fetch("/api/links", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    });

    if (res.status == 201) {
      let newData = datas?.links ? [...datas.links] : [];

      newData.splice(index, 1);
      setDatas({ links: newData });
      setIframeKey(iframeKey + 1);
    }
  };

  return (
    <div className="">
      <Nav />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <div>
            <h2 className="text-2xl mt-5">Description</h2>
            <textarea
              className="rounded-lg w-full mt-5 p-5 drop-shadow-sm border"
              rows={4}
              value={userData.desc}
              onChange={(e) => {
                setUserData({ ...userData, desc: e.target.value });
              }}
            ></textarea>
            <div className="grid justify-items-end mt-3">
              <button
                className="bg-purple-500 text-white py-3 px-10 rounded-lg"
                onClick={() => updateDescription()}
              >
                Save
              </button>
            </div>
          </div>
          <h2 className="text-2xl mt-8">Links</h2>

          <div className="flex flex-col">
            <label className="mt-3 mb-1">
              Url Desciption<span className="text-red-500">*</span>
            </label>
            <textarea
              className="rounded-lg w-full p-2 drop-shadow-sm border"
              onChange={(e) => {
                setUrlDesc(e.target.value), setEmptyError("");
              }}
              value={urlDesc}
            ></textarea>
            <label className="mt-3 mb-1">
              URL<span className="text-red-500">*</span>
            </label>
            <input
              placeholder="https://www.instagram.com/instagram"
              type="url"
              className="rounded-lg w-full p-2 drop-shadow-sm border"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
                setEmptyError("");
              }}
            ></input>
            <p className="text-red-500">{error}&#8203;</p>
            <button
              onClick={() => addUrl()}
              className="bg-purple-500 p-3 mt-3 rounded-lg w-full text-white"
            >
              Add
            </button>
            {emptyError && <p className="text-red-500">{emptyError}</p>}
          </div>
          <div>
            {datas !== null ? (
              <div className="flex flex-col justify-center mt-10">
                {datas?.links?.map((data: Links, index: number) => (
                  <div
                    className="flex justify-between w-full mb-3 bg-white px-2 py-2 lg:px-10 lg:py-5 rounded-lg drop-shadow-sm border"
                    key={index}
                  >
                    <div className="w-full flex justify-center">
                      <div>
                        <div className="ml-3 text-center w-full text-sm lg:text-lg">
                          {data.urlDesc}
                        </div>
                        <a
                          className="ml-3 text-center text-xs lg:text-lg flex justify-center items-center underline underline-offset-1 text-sky-500"
                          href={data.url}
                        >
                          <div className="flex lg:hidden">{truncateText(data.url,30)}</div>
                          <div className="hidden lg:flex">{data.url}</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 lg:h-6 lg:w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        className="p-3 text-red-400 transition duration-300 ease-in-out hover:text-red-600"
                        onClick={() => deleteLink(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 lg:h-6 lg:w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex w-full h-screen justify-center items-center text-5xl text-center font-bold">
                There is no data
              </div>
            )}
          </div>
        </div>
        <div className="lg:ml-10 w-full lg:w-1/4">
          <div className="ml-auto w-fit">
            <a
              href={`/${userData.username}`}
              className="text-purple-500 flex mb-2 p-2"
            >
              <div className="mr-2 font-medium">Go To My Page</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>

          <div className="p-3 bg-slate-700 rounded-3xl">
            {userData.username && loading ? (
              <iframe
                key={iframeKey}
                ref={mobile}
                src={`/${userData.username}`}
                className="rounded-2xl w-full"
                style={{ height: `${mobileHeight}px` }}
              ></iframe>
            ) : (
              <p>loading</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

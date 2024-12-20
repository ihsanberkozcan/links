"use client";
import EditPageDesign from "@/components/EditPageDesign";
import Footer from "@/components/Footer";
import MyLinks from "@/components/MyLinks";
import Nav from "@/components/Nav";
import ArrowRight from "@/components/icons/ArrowRight";
import { MyObjectType, datatype, userdatatype } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useSession, getSession } from "next-auth/react";
import Loading from "@/components/Loading";
import AccessDenied from "@/components/AccessDenied";
import EditLinkBorderRadius from "@/components/EditLinkStyle";
import icon from '../../components/icons/icon.svg';
import Image from 'next/image'
import { IoCopyOutline } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
export default function MyPage() {
  const mobile = useRef<any>(null);
  const [datas, setDatas] = useState<MyObjectType>({});
  const [userData, setUserData] = useState<datatype>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [linksBackgroundColor, setLinksBackgroundColor] =
    useState<string>("#000000");
  const [linksTextColor, setLinksTextColor] = useState<string>("#ffffff");

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
      const urlPattern =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
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

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  const notify = () => {
    toast.success('Copy successful!');
    const host = window.location.host;
    navigator.clipboard.writeText(host + "/" + userData.username)
  };
  return (
    <div className="">
      <Nav />
      <div className="flex flex-col lg:flex-row mt-5 mb-52">
        <div className="w-full lg:w-3/4">
          <div>
            <h2 className="text-2xl">Description</h2>
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
                className="bg-black text-white py-3 px-10 rounded-lg"
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
              className="bg-black p-3 mt-3 rounded-lg w-full text-white"
            >
              Add
            </button>
            {emptyError && <p className="text-red-500">{emptyError}</p>}
          </div>
          <div>
            <h2 className="text-2xl mt-8">My Link</h2>
            <MyLinks
              datas={datas}
              setDatas={setDatas}
              iframeKey={iframeKey}
              setIframeKey={setIframeKey}
            />
          </div>
          <div>
            <h2 className="text-2xl mt-8">Edit My Page Design</h2>
            <EditPageDesign
              iframeKey={iframeKey}
              setIframeKey={setIframeKey}
              linksBackgroundColor={linksBackgroundColor}
              setLinksBackgroundColor={setLinksBackgroundColor}
              linksTextColor={linksTextColor}
              setLinksTextColor={setLinksTextColor}
            />
            <EditLinkBorderRadius
              iframeKey={iframeKey}
              setIframeKey={setIframeKey}
              linksBackgroundColor={linksBackgroundColor}
              linksTextColor={linksTextColor}
            />
          </div>
        </div>
        <div className="lg:ml-8 w-full lg:w-1/4 ">
          <div className="lg:fixed z-10 w-full lg:w-1/5 flex justify-end flex-col">
            <div className="ml-auto w-fit">
              <a
                href={`/${userData.username}`}
                className="text-black flex mb-2 p-2"
              >
                <div className="mr-2 font-medium">Go To My Page</div>
                <ArrowRight />
              </a>
            </div>


            {userData.username && loading ? (

              <div className="mt-[10px] relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 mt-[-1px] rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                  <iframe
                    key={iframeKey}
                    ref={mobile}
                    src={`/${userData.username}`}
                    className="w-full h-full"

                  ></iframe>


                </div>
                <div className="mt-5 p-2 flex flex-row items-center justify-between">
                  <div className="flex gap-1 items-center">
                    <Image
                      alt="logo"
                      src={icon} width={30}
                      height={30} />
                    <div>{userData.username}</div>
                  </div>
                  <button className=" text-white py-2 px-2 rounded-lg" onClick={notify}><IoCopyOutline size={20} color="#000"/></button>
                </div>
              </div>



            ) : (
              <p
                className="rounded-2xl w-full h-full bg-white flex justify-center items-center"
                style={{ aspectRatio: 9 / 16 }}
              >
                <CgSpinner className="animate-spin w-10 h-10" />
              </p>
            )}
          </div>
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

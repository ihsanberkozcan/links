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
export default function MyPage() {
  const mobile = useRef<any>(null);
  const [datas, setDatas] = useState<MyObjectType>({});
  const [userData, setUserData] = useState<datatype>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);

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
          <EditPageDesign iframeKey={iframeKey} setIframeKey={setIframeKey} />
        </div>
        <div className="lg:ml-8 w-full lg:w-1/4 ">
          <div className="lg:fixed z-10 w-full lg:w-1/5">
            <div className="ml-auto w-fit">
              <a
                href={`/${userData.username}`}
                className="text-black flex mb-2 p-2"
              >
                <div className="mr-2 font-medium">Go To My Page</div>
                <ArrowRight />
              </a>
            </div>

            <div className="p-3 bg-slate-800 rounded-3xl">
              {userData.username && loading ? (
                <iframe
                  key={iframeKey}
                  ref={mobile}
                  src={`/${userData.username}`}
                  className="rounded-2xl w-full"
                  style={{ aspectRatio: 9 / 16 }}
                ></iframe>
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
      </div>
      <Footer />
    </div>
  );
}

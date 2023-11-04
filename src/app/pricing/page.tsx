import Nav from "@/components/Nav";
import CheckCircle from "@/components/icons/CheckCircle";
import React from "react";

export default function Pricing() {
  return (
    <div>
      <Nav />
      <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-black pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Free
          </div>
          <div className="w-full bg-black pb-5 text-white font-bold text-xl text-center">
            $0
          </div>
          <ul className="px-8 py-5 text-lg">
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">Unlimited links</div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-black pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Standard
          </div>
          <div className="w-full bg-black pb-5 text-white  font-bold text-xl text-center ">
            not yet
          </div>
          <ul className="px-8 py-5 text-lg blur-sm">
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Earum obcaecati hic reprehenderit delectus soluta dolor expedita
                nam quasi.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Consequatur nostrum molestiae
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">Lorem.</div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-black pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Premium
          </div>
          <div className="w-full bg-black pb-5 text-white  font-bold text-xl text-center">
            not yet
          </div>
          <ul className="px-8 py-5 text-lg blur-sm">
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Earum obcaecati hic reprehenderit delectus soluta dolor expedita
                nam quasi.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Consequatur nostrum molestiae
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">Lorem.</div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Lorem ipsum dolor sit.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Lorem ipsum dolor sit amet.
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-black pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Enterprise
          </div>
          <div className="w-full bg-black pb-5 text-white  font-bold text-xl text-center">
            not yet
          </div>
          <ul className="px-8 py-5 text-lg blur-sm">
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Earum obcaecati hic reprehenderit delectus soluta dolor expedita
                nam quasi.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Lorem ipsum dolor sit amet.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Lorem ipsum dolor sit.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Lorem ipsum dolor sit amet.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Lorem ipsum dolor sit.
              </div>
            </li>
            <li className="mb-3 flex">
              <CheckCircle />
              <div className="ml-1 flex-1 items-center">
                Fugit dolor veritatis molestias aut tempore consequatur ullam
                cupiditate id tenetur.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

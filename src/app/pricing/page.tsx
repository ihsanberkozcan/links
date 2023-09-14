import Nav from "@/components/Nav";
import React from "react";

export default function Pricing() {
  return (
    <div>
      <Nav />
      <div className="flex mt-10">
        <div className="flex-1 mr-5 bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-purple-500 pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Free
          </div>
          <div className="w-full bg-purple-500 pb-5 text-white  font-bold text-xl text-center">
            $0
          </div>
          <ul className="px-10 py-5 text-lg">
            <li className="mb-3">Unlimited links</li>
          </ul>
        </div>
        <div className="flex-1 mx-5 bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-purple-500 pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Standard
          </div>
          <div className="w-full bg-purple-500 pb-5 text-white  font-bold text-xl text-center ">
            not yet
          </div>
          <ul className="px-10 py-5 text-lg blur-sm">
            <li className="mb-3">
              Earum obcaecati hic reprehenderit delectus soluta dolor expedita
              nam quasi.
            </li>
            <li className="mb-3">Consequatur nostrum molestiae</li>
            <li className="mb-3">Lorem.</li>
          </ul>
        </div>

        <div className="flex-1 mx-5 bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-purple-500 pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Premium
          </div>
          <div className="w-full bg-purple-500 pb-5 text-white  font-bold text-xl text-center">
            not yet
          </div>
          <ul className="px-10 py-5 text-lg blur-sm">
            <li className="mb-3">
              Earum obcaecati hic reprehenderit delectus soluta dolor expedita
              nam quasi.
            </li>
            <li className="mb-3">Consequatur nostrum molestiae</li>
            <li className="mb-3">Lorem.</li>
            <li className="mb-3">Lorem ipsum dolor sit.</li>
            <li className="mb-3">Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
        <div className="flex-1 ml-5 bg-white rounded-xl overflow-hidden">
          <div className="w-full bg-purple-500 pt-5 pb-2 text-white font-extrabold text-2xl text-center">
            Enterprise
          </div>
          <div className="w-full bg-purple-500 pb-5 text-white  font-bold text-xl text-center">
            not yet
          </div>
          <ul className="px-10 py-5 blur-sm text-lg">
            <li className="mb-3">
              Earum obcaecati hic reprehenderit delectus soluta dolor expedita
              nam quasi.
            </li>
            <li className="mb-3">Consequatur nostrum molestiae</li>
            <li className="mb-3">Lorem.</li>
            <li className="mb-3">Lorem ipsum dolor sit.</li>
            <li className="mb-3">Lorem ipsum dolor sit amet.</li>
            <li className="mb-3">
              Quo optio labore consequatur, in odit similique inventore sit
            </li>
            <li className="mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

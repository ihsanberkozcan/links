import Nav from "@/components/Nav";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
export default function Pricing() {
  return (
    <div>
      <Nav />
      <section className="mt-32">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-3 md:gap-6 lg:gap-8">
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Basic</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">Free</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Unlimited links
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <button className="w-full bg-black text-white p-2 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
            <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-center">Pro</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold line-through">$59</span>/
                  month
                </div>
                <ul className="mt-4 space-y-2 blur-sm">
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg blur-sm">
                  Get Started
                </button>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Enterprise</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold line-through">$99</span>/
                  month
                </div>
                <ul className="mt-4 space-y-2 blur-sm">
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle color="#22c55e" />
                    Lorem ipsum dolor sit amet.
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <button className="w-full bg-black text-white p-2 rounded-lg blur-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

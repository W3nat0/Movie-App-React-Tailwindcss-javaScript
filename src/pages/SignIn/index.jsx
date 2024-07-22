import React from "react";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold flex justify-center mb-5">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

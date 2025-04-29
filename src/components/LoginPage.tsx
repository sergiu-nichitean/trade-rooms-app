import React from "react";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder=""
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder=""
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              id="remember"
              type="checkbox"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>
          <Button className="w-full" type="button">
            Log in
          </Button>
          <div className="flex items-center my-2">
            <div className="flex-grow border-t" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t" />
          </div>
          <Button className="w-full" variant="secondary" type="button">
            Sign Up
          </Button>
          <div className="w-full my-2">
            <WalletMultiButton className="w-full !justify-center !bg-blue-200 !text-black !rounded-md !py-2" />
          </div>
          <Button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white" type="button">
            <FcGoogle className="text-xl bg-white rounded-full" />
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-primary hover:underline text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 
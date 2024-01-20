import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Button, ButtonVariant } from "./button";

export default function EarlyAccessFooter(): JSX.Element {
  const [authenticityToken, setAuthenticityToken] = useState<string | null>(
    null
  );

  const [email, setEmail] = useState("");

  useEffect(() => {
    const originalForm = document.getElementById("early-access-inline-form");
    setAuthenticityToken(
      (
        originalForm?.querySelector(
          "[name=authenticity_token]"
        ) as HTMLInputElement
      ).value || null
    );
  }, []);

  return (
    <aside
      className={classNames(
        authenticityToken === null ? "invisible" : "",
        "relative p-8 md:p-16 lg:p-20 rounded-2xl bg-gray-900 overflow-hidden"
      )}
    >
      {/* Background swoosh */}
      <svg
        className="absolute top-1/2 left-8 sm:left-1/3 opacity-50 sm:opacity-100 transform -translate-y-1/2"
        width="708"
        height="190"
        viewBox="0 0 760 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="swoosh_gradient"
            x1="695"
            y1="95"
            x2="13.0001"
            y2="95"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B7F9F9" />
            <stop offset="1" stopColor="#B7F9F9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M695 13C658.005 38.3563 596.761 84.5519 482.791 84.5519C340.329 84.5519 313.6 32.9587 189.79 32.9587C90.743 32.9587 37.7152 128.986 13 177"
          stroke="url(#swoosh_gradient)"
          strokeWidth="24"
          strokeLinecap="round"
        />
      </svg>

      {/* Copy + form */}
      <div className="relative max-w-3xl">
        <h2 className="-mr-4 text-white font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-heading">
          Plan your financial future with Maybe.
        </h2>
        <p className="mt-5 max-w-xl">
          Modern financial planning &amp; investment management. Get early
          access and help shape the product by dropping in your email address.
        </p>
        <form
          action="/early-access"
          method="post"
          className="max-w-lg mt-8 md:mt-16 lg:mt-20"
        >
          <input
            type="hidden"
            name="authenticity_token"
            value={authenticityToken ?? ""}
          />
          <div className="relative flex flex-col sm:flex-row items-stretch justify-between w-full p-1 rounded-xl bg-gray-800 focus-within:ring focus-within:ring-red focus-within:ring-opacity-50">
            <input
              type="email"
              name="early_access_user[email]"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your e-mail"
              className="flex-grow px-4 py-2 mb-1 bg-transparent border-0 appearance-none focus:ring-0 focus:outline-none sm:mb-0"
            />
            <div>
              <Button
                type="submit"
                variant={ButtonVariant.White}
                disabled={email.trim().length === 0}
              >
                Get Started
              </Button>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}

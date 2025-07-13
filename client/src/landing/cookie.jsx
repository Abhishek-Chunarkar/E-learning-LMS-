import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieExample() {
  const [cookieValue, setCookieValue] = useState("");

  // Read cookie on mount
  useEffect(() => {
    const saved = Cookies.get("myCookie") || "";
    setCookieValue(saved);
  }, []);

  const handleSetCookie = () => {
    Cookies.set("myCookie", "HelloCookie", { expires: 7 }); // 7 days
    setCookieValue("HelloCookie");
  };

  const handleRemoveCookie = () => {
    Cookies.remove("myCookie");
    setCookieValue("");
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Cookie Example</h2>
      <p>Current cookie value: <strong>{cookieValue || "No cookie set"}</strong></p>
      <button
        onClick={handleSetCookie}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        Set Cookie
      </button>
      <button
        onClick={handleRemoveCookie}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Remove Cookie
      </button>
    </div>
  );
}

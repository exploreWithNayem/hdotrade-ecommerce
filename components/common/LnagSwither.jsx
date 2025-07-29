"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    {
      code: "en",
      language: "English",
      title: "EN",
    },
    {
      code: "bn",
      language: "বাংলা",
      title: "বাংলা",
    },
  ];

  const router = useRouter();
  const lang = languages?.find((lan) => pathName.includes(lan.code));
  const [language, setLanguage] = useState(lang);

  const handleLangSwitch = (language) => {
    setLanguage(language);
    setShow(false); // Hide dropdown after switching
    const newPath = pathName.substring(3);
    router.push(`/${language.code}/${newPath}`);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false); // Hide dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 px-2 inline-block"
      ref={dropdownRef} // Attach ref here
    >
      <div
        className="hover:text-primary flex items-center gap-2 text-white cursor-pointer"
        onMouseOver={() => setShow(true)} // Show dropdown when hovering over the trigger
      >
        <i className="fa-solid fa-globe"></i>
        {language?.title}

          <i className="fa-solid fa-angle-down"></i>
  
      </div>

      {show && (
        <div
          className="absolute right-0 top-full mt-2 w-40 rounded-md bg-white dark:bg-[#ffffff] p-2 z-10 shadow-lg"
          onMouseOver={() => setShow(true)} // Keep dropdown visible when hovering over it
          onMouseOut={() => setShow(false)} // Hide dropdown when mouse leaves the dropdown area
        >
          {languages?.map((language) => (
            <div
              onClick={() => {
                handleLangSwitch(language);
              }}
              key={language?.code}
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:text-white hover:bg-red-500"
            >
              {language?.language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

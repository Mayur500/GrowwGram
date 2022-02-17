import React, { useState, useEffect } from "react";


export const useThemeDetector = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {

  const [isdark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      setDark(true);
    }
  }, []);


  return [isdark, setDark];
}


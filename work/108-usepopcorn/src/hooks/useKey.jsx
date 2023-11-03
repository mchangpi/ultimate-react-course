import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const keydownCallback = (e) => {
        console.log(e.code.toLowerCase());
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action?.(); // onCloseMovie();
        }
      };

      document.addEventListener("keydown", keydownCallback);

      return () => {
        // remove event listener
        document.removeEventListener("keydown", keydownCallback);
      };
    },
    [key, action] /*[onCloseMovie]*/
  );
}

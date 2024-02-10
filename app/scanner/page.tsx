"use client";

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanType, Html5QrcodeScanner } from "html5-qrcode";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [activeScanner, setActiveScanner] = useState(true);
  const [scanResult, setScanResult] = useState<string | any>(null);
  const [errorResult, setErrorResult] = useState<string | any>(null);
  const [isCopied, setIsCopied] = useState(false);

  const startScanner = () => {
    let scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 200, height: 200 },
        rememberLastUsedCamera: true,
      },
      false
    );

    const success = (decodedText: string | any, decodedResult: any) => {
      console.log("decodedText", decodedText, "decodedResult", decodedResult);
      if (decodedText) {
        setScanResult(decodedText);
        scanner.clear();
        setActiveScanner(true);
      }
    };

    const error = (error: string) => {
      setErrorResult(error);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  };

  const scan = () => {
    setActiveScanner(false);
    startScanner();
  };

  const navigateHome = () => {
    router.push("/");
  };

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Unable to copy to clipboard:", err);
      return false;
    }
  }

  const coptTextFunc = () => {
    copyTextToClipboard(scanResult)
      .then((data) => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("$$$$$$", isCopied);

  return (
    <div className=" text-center mt-10  ">
      <h1 className="text-2xl uppercase font-semibold font-cursive">
        QR Code Scanner
      </h1>
      <p className="text-xl mt-5 ">Scan QR codes with this handy scanner.</p>
     
      {scanResult ? (
        <> 
         <h1 className="text-xl uppercase font-semibold  mt-3">Result</h1>
        <div className="flex gap-3 justify-center ">
          <p className=" underline highlight">{scanResult} </p>{" "}
          {!isCopied ? (
            <span
              className="flex gap-3 align-center cursor-pointer "
              onClick={coptTextFunc}
            >
              <span>Copy</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#a179c6"
                className="bi bi-clipboard-fill mt-1"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2"
                />
              </svg>
            </span>
          ) 
          
         
          : (
            <span className="flex gap-3 align-center c ">
              <span>Copied</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#a179c6"
                className="bi bi-clipboard-check-fill mt-1"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
              </svg>
            </span>
          )}
        </div>
        </>
      ) : null}
      <div className=" flex gap-9 justify-center mt-10 mb-7">
        <button onClick={navigateHome}>Home</button>

        {activeScanner ? <button onClick={scan}> Start QR </button> : null}
      </div>

      <div className=" w-full ">
        <div
          style={{
            maxWidth: 500,
            maxHeight: 550,
            margin: "auto",
            background: ` ${!activeScanner ? "#ffffff40" : ""}`,
            borderRadius: ` ${!activeScanner ? "20px" : 0}`,
            overflow: "hidden",
            padding: ` ${!activeScanner ? "15px" : 0}`,
          }}
          id="reader"
        ></div>
      </div>
    </div>
  );
}

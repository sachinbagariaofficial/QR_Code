"use client";
import Image from "next/image";
import "./style.css";
import { useEffect, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import qrCodeImage from "@/public/assets/images/qr-code.png";

export default function Generator() {
  const [inputData, setInputData] = useState({
    name: "",
    qrText: "",
  });

  const [qrTextGenerate, setQrTextGenerate] = useState("");
  const [qrCodeSucessfully, setQrCodeSucessfully] = useState(false);

  const createQRCode = (e: any) => {
    e.preventDefault();
    if (inputData.qrText) {
      setQrTextGenerate(inputData.qrText);
      setQrCodeSucessfully(true);
      setInputData({ name: "", qrText: "" });
    } else {
      alert("Enter value");
    }
  };

  const downloadQRCode = () => {
    if (qrTextGenerate) {
      const svgElement = document.getElementById("qrcode-svg");
      console.log("svgElement", svgElement?.outerHTML);
      if (svgElement) {
        const svgString = svgElement.outerHTML;
        const blobURl = window.URL.createObjectURL(new Blob([svgString]));
        const aTag = document.createElement("a");
        aTag.href = blobURl;
        aTag.href = blobURl;
        aTag.setAttribute("download", "qrcode.svg");
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();

        setQrTextGenerate("");
      }
    } else {
      alert("Enter Data First");
    }
  };

  useEffect(() => {
    const qrcodeID = setTimeout(() => {
      setQrCodeSucessfully(false);
    }, 3000);
    console.log("object", qrCodeSucessfully);
    return () => clearTimeout(qrcodeID);
  }, [qrCodeSucessfully]);

  // console.log("qrTextGenerate.length", qrTextGenerate.length);

  return (
    <>
      {qrCodeSucessfully ? (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Congratulations </p>
              <p className="text-sm">
                {inputData?.name} You have created a QR code
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col justify-center items-center h-full p-10 ">
        <h1 className="text-2xl uppercase font-semibold text-center mt-4 font-family">
          qr code generator
        </h1>
        <Link
          className="text-xl mt-6  text-fuchsia-400 font-semibold "
          href="/"
        >
          <button>
          Home
          </button>
          
        </Link>
        <div className="flex flex-col justify-center items-center  md:flex-row gap-7 sachin-bagaria">
          <div className="form-container mt-10 order-2 md:order-1">
            <form className="form" onSubmit={(e) => createQRCode(e)}>
              {/* <div className="form-group">
                <label htmlFor="name">Creater</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={inputData.name}
                  required
                  onChange={(e) =>
                    setInputData({ ...inputData, name: e.target.value })
                  }
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="textarea">
                  Generate a QR code for the following text:
                </label>
                <textarea
                  value={inputData.qrText}
                  name="textarea"
                  id="textarea"
                  rows={5}
                  cols={50}
                  required
                  onChange={(e) =>
                    setInputData({ ...inputData, qrText: e.target.value })
                  }
                />
              </div>
              <button className="form-submit-btn" type="submit">
                Create QR
              </button>
            </form>
          </div>
          <div className=" order-1 mt-10 md:order-2 ">
            <div className={qrTextGenerate.length ? "qr-image" : ``}>
              {!qrTextGenerate.length ? (
                <Image
                  src={qrCodeImage}
                  width={500}
                  height={500}
                  alt="QR CODE GENERATOR"
                  loading="lazy"
                  placeholder="blur"
                />
              ) : (
                <QRCodeSVG
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="200"
                  height="200"
                  id="qrcode-svg"
                  value={qrTextGenerate}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://sachinbagaria.onrender.com/Assets/Images/Favicon.png",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              )}
            </div>

            {qrTextGenerate ? (
              <button
                className="form-submit-btn mt-4"
                type="button"
                onClick={downloadQRCode}
              >
                Download
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

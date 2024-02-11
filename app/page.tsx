import Image from "next/image";
import Link from "next/link"
import brandLogo from "@/public/assets/images/Favicon.png"

export default function Home() {
  return (
    <>
      <div className="container-custom flex flex-col gap-10 justify-center items-center ">
      <Image
          src={brandLogo}
          width={50}
          height={50}
          alt="Sachin bagaria logo"
          loading="lazy"
          placeholder="blur"
        />
        <div className="terminal-loader">
          <div className="terminal-header">
         
            <div className="terminal-title">QR CODE</div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="text">Select Below QR Option:</div>
        </div>

        <div className="flex gap-7 flex-wrap justify-center">

          <Link href="/generator"> <button> QR Generator</button>  </Link>
          <Link href="/scanner"> <button>QR Scanner
             </button>  </Link>
        </div>
      </div>
    </>
  );
}

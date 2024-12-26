import React from "react";

const Victory = () => {
  return (
    <div className="bg-background py-10xl">
      <div className="container">
        <article className="flex flex-col w-full items-center">
          <p className="font-Open_Sans font-normal text-text-secondary text-[15px] uppercase leading-5 letter-spacing tracking-[0.15em] ">
            Yutuqlar
          </p>
          <h1 className="font-Open_Sans font-normal text-3xl leading-10 md:text-4xl md:leading-[60px]">
            Mening yutuqlarim
          </h1>
        </article>
        <div className="flex flex-col w-full items-center lg:flex-row md:justify-between">
          <div className="w-[287px] h-[297px] flex flex-col justify-start items-center p-[35px] gap-[25px]">
            <p className="font-Abril font-normal text-[35px] leading-[48px] text-text-secondary">
              300+
            </p>

            <article className="flex flex-col justify-center items-center gap-ten">
              <h6 className="font-Open_Sans font-normal text-xl leading-7 text-text">
                Rasmlar olingan
              </h6>
              <p className="text-center text-thin font-Open_Sans font-normal text-lg leading-7-">
                Boshidan beri 300 dan ortiq fotosuratlar olingan.
              </p>
            </article>
          </div>
          <div className="w-[287px] h-[297px] flex flex-col justify-start items-center p-[35px] gap-[25px]">
            <p className="font-Abril font-normal text-[35px] leading-[48px] text-text-secondary">
              10+
            </p>

            <article className="flex flex-col justify-center items-center gap-ten">
              <h6 className="font-Open_Sans font-normal text-xl leading-7 text-text">
                Brendlar
              </h6>
              <p className="text-center text-thin font-Open_Sans font-normal text-lg leading-7-">
                Sofia, Maselko, Matte va Croisant va boshqalar kabi brendlar
                bilan ishlash.
              </p>
            </article>
          </div>
          <div className="w-[287px] h-[297px] flex flex-col justify-start items-center p-[35px] gap-[25px]">
            <p className="font-Abril font-normal text-[35px] leading-[48px] text-text-secondary">
              50+
            </p>

            <article className="flex flex-col justify-center items-center gap-ten">
              <h6 className="font-Open_Sans font-normal text-xl leading-7 text-text">
                Talabalar
              </h6>
              <p className="text-center text-thin font-Open_Sans font-normal text-lg leading-7-">
                50 dan ortiq talabalar mening kurslarimni tamomladilar.
              </p>
            </article>
          </div>
          <div className="w-[287px] h-[297px] flex flex-col justify-start items-center p-[35px] gap-[25px]">
            <p className="font-Abril font-normal text-[35px] leading-[48px] text-text-secondary">
              10+
            </p>

            <article className="flex flex-col justify-center items-center gap-ten">
              <h6 className="font-Open_Sans font-normal text-xl leading-7 text-text">
                Yaratilgan kurslar
              </h6>
              <p className="text-center text-thin font-Open_Sans font-normal text-lg leading-7-">
                Men tomonidan ishlab chiqilgan tanlangan kurslar.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Victory;

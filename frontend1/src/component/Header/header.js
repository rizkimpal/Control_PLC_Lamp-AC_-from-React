import React from "react";
import moment from "moment";
import Clock from "react-live-clock";

export default function HeaderClassroomControl() {
  return (
    <>
            {/* Header */}
            <div className="top-0 absolute z-50 w-full flex flex-wrap pt-5 mt-5">
                <div className="px-4 md:px-6 mx-auto w-full">
                    <div className="flex justify-end pr-2">
                        <div className="flex-col">
                            <div className="text-xl font-medium text-grey-70 pb-1">
                                {moment().format("dddd, D MMMM YYYY")}
                            </div>
                            <div className="text-right font-semibold text-3xl text-[#E80000]">
                                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 top-5">
                        <div className="text-left pl-12 uppercase text-4xl font-medium ">
                            IoT Class
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
}

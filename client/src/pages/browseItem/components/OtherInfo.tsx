type OtherInfoProps = {
    isMoreModalStatus : boolean
    castsData : {
        cast : {
          original_name : string
        }[]
    }
    showDetailsData : {
        name? : string
        original_title? : string
        tagline? : string
        genres : {
            name : string
        }[]
        created_by : {
            name : string
        }[]
    }
    age : string
    onClick : () => void
}

export const OtherInfo = ({isMoreModalStatus, castsData, showDetailsData, age, onClick} : OtherInfoProps) => {
  return (
    <div 
      className={`custom-transition-duration-3s h-screen w-full fixed left-0 rounded-t-[10px] z-20
      bg-[#242424] flex flex-col ${isMoreModalStatus ? "top-[.20rem]" : "top-[100vh]"}`}
    >
      {/* Close */}
      <div className="bg-[#3f3f3f] h-[2rem] w-[2rem] rounded-full flex items-center justify-center text-white ml-auto mt-2 mr-2" onClick={onClick}>
        <p className="text-2xl mt-[-1px]">&#215;</p>
      </div>

      {/* Title */}
      <p className="text-white text-xl font-bold text-center mt-[-1.50rem] mx-auto max-w-[75%]">{showDetailsData?.name || showDetailsData?.original_title}</p>

      <div className="flex-grow mt-4 overflow-y-scroll mb-5">
        {/* Cast */}
        <p className="text-center mx-auto text-white font-bold">Cast</p>
        {/* Cast Mapping */
        castsData && castsData.cast.map((res: { original_name: string }) => 
          <p className="mt-4 text-sm text-center mx-auto text-white" key={res?.original_name}>{res?.original_name}</p>
        )}

        {/* Creators */}
        <p className="text-center mx-auto text-white font-bold mt-4">Creators</p>
        {/* Creators Mapping */
        showDetailsData?.created_by?.map((res: { name: string }) => 
          <p className="mt-4 text-sm text-center mx-auto text-white" key={res?.name}>{res?.name}</p>
        )}

        {/* Maturity Rating */}
        <p className="text-center mx-auto text-white font-bold mt-4">Maturity Rating</p>
        <div className="text-[#bcbcbc] mx-auto mt-4 w-[2rem] text-xs px-[5px] bg-[#464646] rounded-[2px]">{age}+</div>

        {/* Genres */}
        <p className="text-center mx-auto text-white font-bold mt-4">Genres</p>
        {/* Cast Mapping */}
        {showDetailsData?.genres?.map((res: { name: string }) => 
          <p className="mt-4 text-sm text-center mx-auto text-white" key={res?.name}>{res?.name}</p>
        )}

        {/* Tagline */}
        <p className="text-center mx-auto text-white font-bold mt-4">Tagline</p>
        <p className="mt-4 text-sm text-center mx-auto text-white">{showDetailsData?.tagline || "Not Available"}</p>
      </div>
    </div>
  )
}

import searchIcon from "../../assets/images/icons/search.png"
import closeIcon from "../../assets/images/icons/close.png"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { useRouteAndQueryParams } from "../../utils/itemsFunction"
import { useNavigate } from "react-router-dom"
import { Page as Search } from "../../pages/search/Page"

export const SearchInput = () => {
    // Navigate
    const navigate = useNavigate()
    
    // Get search value params
    const urlParams = new URLSearchParams(window.location.search)
    const searchParams = urlParams.get('search')

    //Click Search Input
    const inputRef = useRef<HTMLInputElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)
    const [isSearchClick, setSearchClick] = useState<boolean>(false)
    const clickSearch = () => {
        isSearchClick && inputRef?.current?.focus()
        setSearchClick(true)
    }

    // Close Search Input
    const closeSearchInput = (event: MouseEvent) => {
        parentRef.current && !parentRef.current.contains(event.target as Node) && searchParams !== "1" && setSearchClick(false)       
    }

    useEffect(() => {
        isSearchClick ? document.addEventListener("mousedown", closeSearchInput) : document.removeEventListener("mousedown", closeSearchInput)
        return () =>  document.removeEventListener("mousedown", closeSearchInput)
    }, [isSearchClick, searchParams])

    // When the user inputted in search input
    const { params } = useRouteAndQueryParams()
    const [searchValue, setSearchValue] = useState<string>(params === "Default" ? "" : params)
    const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
        isSearchClick && setSearchValue(event?.target?.value)
    } 

    useEffect(() => {
        searchValue ? navigate(`/?search=1&q=${searchValue}`) : navigate("/")
        searchValue !== "" && setSearchClick(true)
    },[searchValue])

    // Clear Search Input
    const clearSearchInput = () => setSearchValue("")

  return (
    <div ref={parentRef}>
        <div
            className = {
                `flex h-10 border custom-transition-duration-3s cursor-pointer hover:opacity-80 disable-highlight
                ${isSearchClick ? "bg-black bg-opacity-80 border-solid border-white" : "bg-transparent border-transparent"}`
            }
        >
            <div className={`h-10 custom-transition-duration-3s flex items-center justify-center active:scale-110 ${isSearchClick ? "w-10" : "w-auto"}`} onClick={clickSearch}>
                <img src={searchIcon} alt="Search Image" className="h-5"/>
            </div>

            <input type="text" 
                ref={inputRef}
                placeholder="Titles, people, genres"
                autoComplete="off"
                value={searchValue}
                onChange={handleChange}
                className={
                    `border-none h-10 bg-transparent outline-none text-white text-sm pl-1 w-0 custom-transition-duration-3s ${isSearchClick && "w-48"}`
                }
            />

            <div className={`w-0 flex items-center justify-center custom-transition-duration-3s ${isSearchClick && "w-12"}`}>
              <img src={closeIcon} alt="Close Image" className={`h-[15px] ${searchValue === "" && "hidden"}`} onClick={clearSearchInput}/>
            </div>
        </div>

        {/* Search Section */
          searchParams === "1" &&
          <Search/>
        }
    </div>
  )
}

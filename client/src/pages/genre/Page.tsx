import { useEffect, useRef } from "react"
import { NavbarLarge } from "../../components/navbar/NavbarLarge"
import { NavbarMedium } from "../../components/navbar/NavbarMedium"
import { NavbarNormal } from "../../components/navbar/NavbarNormal"
import { NavbarSmall } from "../../components/navbar/NavbarSmall"
import { Slider } from "../../components/slider/Slider"
import { SliderTop10 } from "../../components/slider/SliderTop10"
import { useAppStore } from "../../store/ZustandStore"
import { getCurrentSection } from "../../utils/getCurrentSection"
import { Hero } from "./sections/Hero"
import { ShowsDetails } from "../../components/modals/showDetails/ShowsDetails"
import { useClickHandlers, useRouteAndQueryParams } from "../../utils/itemsFunction"
import { slidersTV } from "../../data/slidersData"
import { Footer } from "../../components/footer/Footer"
import { ListByGenre } from "../../components/modals/listByGenre/ListByGenre"
import { SubnavBar } from "../../components/subNavbar/SubnavBar"
import { useParams } from "react-router-dom"

type NavbarProps = {
  scrollDirection : string
  isAtTop : boolean
}

export const Page = ( {scrollDirection, isAtTop} : NavbarProps ) => {
  // Params Url Getter
  const { params, categoryParams } = useRouteAndQueryParams()
  const urlParams = new URLSearchParams(window.location.search)
  const searchParams = urlParams.get("search")
  const { genreId } = useParams<{genreId : string}>()

  // State from zustand
  const {screenWidth, setCurrentPage} = useAppStore()

  // Show scroll everytime screen chage
  useEffect(() => {
    setCurrentPage("TV Shows")
    document.title = "TV Shows - Netflix Clone by Kharl"
    if(screenWidth >= 640){
      const body = document.body
      body.style.overflowY = "scroll"
    }
  },[screenWidth])

  // Getting Active Section
  const activeSections = getCurrentSection()
  const { setCurrentSection } = useAppStore()
  useEffect(() => {
    setCurrentSection(activeSections)
  }, [activeSections])

  // Closing Modal
  const modalRef = useRef<HTMLDivElement>(null)
  const { handleCloseModalOut } = useClickHandlers()
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const parentDiv = modalRef.current;
      const clickedElement = event.target as Node;
      parentDiv && parentDiv === clickedElement && handleCloseModalOut()  
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  // Scroll to bottom in modal ref
  const scrollToBottom = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: modalRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  // Function to determine margin style based on screen width
  const determineMarginStyle = (screenWidth: number) => {
    if (screenWidth < 640) return "ml-5"
    if (screenWidth <= 800) return "ml-7"
    if (screenWidth <= 950) return "ml-7"
    return "ml-14";
  }

  return (
    <section className="bg-custom-color-hero-1 overflow-hidden h-auto">
        
      {// My Navigation
        screenWidth < 640 ?
          <NavbarSmall scrollDirection = {scrollDirection} isAtTop = {isAtTop}/>
        :
        screenWidth <= 800 ?
          <NavbarMedium scrollDirection = {scrollDirection} isAtTop = {isAtTop}/>
        :
        screenWidth <= 1050 ?
          <NavbarNormal scrollDirection = {scrollDirection} isAtTop = {isAtTop}/>
        :
          <NavbarLarge scrollDirection = {scrollDirection} isAtTop = {isAtTop} active = "TV Shows"/>
      }

      {/* Subnavbar for genre  */
      searchParams !== "1" &&  screenWidth >= 640 &&
        <SubnavBar isAtTop = {isAtTop} category = "tv"/>
      }

      {/* Hero Section */}
      <Hero/>

      {/* Category Mapping */}
      <main id="categorySection">
        {slidersTV.map((slider, index) => {
          const CommonProps = {
            marginStyle: determineMarginStyle(screenWidth), 
            sliderStyle: index === 0 ? "sm:mt-[-8.7rem] z-[40]" : slider.sliderStyle,
            title: slider.title,
            queryType: slider.queryType,
            queryKey: slider.queryKey,
            classCount: slider.classCount,
            genre: slider.genre
          }

          return slider.componentType === "Slider" ? (
            <Slider {...CommonProps} key={slider.queryKey} />
          ) : (
            <SliderTop10 {...CommonProps} key={slider.queryKey} />
          )
        })}
      </main>

      {/* Footer */}
      <Footer/>

      {/* Item Modal - [Larger Screens] */
      (screenWidth >= 640 && params !== "Default" && (categoryParams === "tv" || categoryParams === "movie")) &&
        <div className="min-h-[100dvh] w-full fixed z-[1000] modal-background inset-0 overflow-y-scroll hidden sm:block" ref={modalRef}>
          <ShowsDetails scrollToBottom = {scrollToBottom} myRef = {modalRef}/>
        </div>
      }

      {/* Genre Modal - [Larger Screens] */
      (screenWidth >= 640 && location.pathname.includes("/browse/t/genre/") && genreId) &&
        <div className="min-h-[100dvh] w-full fixed z-[1000] modal-background inset-0 overflow-y-scroll hidden sm:block" ref={modalRef}>
          <ListByGenre/>
        </div>
      }
    </section>
  )
}
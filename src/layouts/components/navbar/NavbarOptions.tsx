import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import { APP_LOCAL_STORAGE_THEME_DARK_VALUE, APP_LOCAL_STORAGE_THEME_KEY, APP_LOCAL_STORAGE_THEME_LIGHT_VALUE } from "@/global/constants";
import '@/styles/shared.css'
import { FaTasks } from "react-icons/fa";

export default function NavbarOptions({children}) {
    const {list} = useAppSelector(state => state.task)

    const [darkTheme, setDarkTheme] = useState<boolean>(true)
    const [bounceCartIcon, setBounceCartIcon] = useState<boolean>(false)
  
    useEffect(() => {
      const dark = localStorage.getItem(APP_LOCAL_STORAGE_THEME_KEY)
      if (dark === APP_LOCAL_STORAGE_THEME_DARK_VALUE) {
        setDarkTheme(true)
      } else {
        setDarkTheme(false)
      }
    }, [])
  
    useEffect(() => {
      if (list.length === 0 ) return
  
      setBounceCartIcon(true)
      const timeout = setTimeout(() => setBounceCartIcon(false), 300)
  
      return () => clearTimeout(timeout)
    }, [list.length])
  
    const toggleTheme = () => {
      if (darkTheme) {
        document.documentElement.classList.remove(APP_LOCAL_STORAGE_THEME_DARK_VALUE)
        localStorage.setItem(APP_LOCAL_STORAGE_THEME_KEY, APP_LOCAL_STORAGE_THEME_LIGHT_VALUE)
      } else {
        document.documentElement.classList.add(APP_LOCAL_STORAGE_THEME_DARK_VALUE)
        localStorage.setItem(APP_LOCAL_STORAGE_THEME_KEY, APP_LOCAL_STORAGE_THEME_DARK_VALUE)
      }
      setDarkTheme(!darkTheme)
    }

  return (
    <div className="flex items-center gap-6">

    {/* Theme Button */}
    <button
      className="text-white text-xl"
      onClick={toggleTheme}
    >
      {darkTheme ? <FaMoon className="text-purple-600" /> : <FaSun className="text-yellow-500"/>}
    </button>

    {/* Cart Button */}
    <NavLink
      to={"/tasks"}
      className="pr-2 relative cursor-pointer"
    >
      <div 
        className={` ${bounceCartIcon && "beat-animation "} absolute -top-2.5 left-3 rounded-full px-1 min-w-4  h-4 flex justify-center items-center text-xs font-semibold bg-green-500 bg-opacity-90 text-white`}
      >
        {list.length}
      </div>
      <FaTasks  className="dark:text-white text-blue-700 text-xl" />
    </NavLink>

    {/* Children */}
    {children}
  </div>
  )
}

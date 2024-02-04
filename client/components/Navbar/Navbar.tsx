'use client'
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useTranslation } from 'react-i18next';
import PouriaTheme from '../../shared/components/PouriaTheme';
import { Box, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app-context';
import Themes from '../../shared/Themes/Themes';

const Navbar = () => {
  const [t,i18n] = useTranslation()
  const theme = useTheme()
  const ctx =useContext(AppContext)
  const [themeName, setThemeName] = useState("light")
  const changeLanguage = (lang:string) => {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    const targetedTheme = Object.entries(Themes).find(i => i[0] === themeName) ?? ["dark",{
      background: '#161B25',
      sub_background: "#343D48",
      primary:'#12372A',
      secondary:'#81689D',
   }]
    const theme = {primary:targetedTheme[1].primary,secondary:targetedTheme[1].secondary,background:targetedTheme[1].background}
    ctx?.changeTheme(theme)
  }, [themeName])
  
 
  return (
    <Box
      sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
      className={
        "flex rounded-[1rem] font-vazir p-[3rem] h-[200px] -mb-[3rem] mt-[3rem] flex-row justify-between text-light"
      }
    >
      <div className="flex flex-row gap-5 justify-content-center items-content-center ">
        {themeName === "light" ? <LightModeIcon onClick={() => setThemeName("night")} /> : <ModeNightIcon onClick={() => setThemeName("light")}/>}
        <h4
          className="cursor-pointer"
          onClick={(e: any) => changeLanguage("en")}
        >
          فارسی
        </h4>
        <h4
          className="cursor-pointer"
          onClick={(e: any) => changeLanguage("fa")}
        >
          english
        </h4>
        <PouriaTheme />
      </div>
      <div className="cursor-pointer">
        <h1>{t("تنظیمات کاربری")}</h1>
      </div>
    </Box>
  );
}

export default Navbar
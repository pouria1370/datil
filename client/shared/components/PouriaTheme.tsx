'use client'
import  { useContext, useState } from 'react'
import { Box, Button, MenuItem, Modal, Select, useTheme } from '@mui/material'
import Themes from '../Themes/Themes'
import { AppContext } from '../../context/app-context'
import { useTranslation } from 'react-i18next'

const PouriaTheme = () => {
    const [currentThemeName, setCurrentThemeName] = useState<string>("")
    const theme = useTheme()
    const ctx = useContext(AppContext)
    const [isModalShown, setIsModalShown] = useState(false)
    const openModal = () => {
        setIsModalShown(true)
    }
    const { t } = useTranslation()

    const SelectChangeHandler = (e: any) => {
        setCurrentThemeName(e.target.value)
    }
const submitHandler = (themeName:string) => {

    switch (themeName) {
        case 'astra':
            ctx?.changeTheme(Themes.astro)
            break;
        case 'dark':
            ctx?.changeTheme(Themes.dark)
            break;
        case 'light':
            ctx?.changeTheme(Themes.light)
            break;
        case 'roxhin':
            ctx?.changeTheme(Themes.roxhin)
            break;
        case 'nika':
            ctx?.changeTheme(Themes.nika)
            break;
    
        default:
            break;
    }

}

    return (
        <Box sx={(theme) => ({backgroundColor:theme.palette.secondary.main})}>
            <Button color='primary'  onClick={openModal} >{t('Theme')}</Button>
            <Modal
                open={isModalShown}
                onClose={() => {
                    setIsModalShown(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disablePortal

            >
                <Box
                    className='flex flex-col md:w-1/2  absolute top-[50%] left-[50%]
           -translate-x-1/2 -translate-y-1/2 bg-gray rounded-[0.7rem] p-[4rem] w-full'

                >
                    <div className='flex flex-col md:flex-row justify-between gap-4 items-baseline'>
                        <Select
                            value={currentThemeName}
                            label={t("نوع")}
                            onChange={SelectChangeHandler}
                            className='basis-fulll text-text_disablity font-vazir '
                            color='warning'
                            fullWidth

                        >
                            <MenuItem className='font-vzir text-sm text-text' value={"dark"}>Dark</MenuItem>
                            <MenuItem className='font-vzir text-sm text-text' value={"light"}>Light</MenuItem>
                            <MenuItem className='font-vzir text-sm text-text' value={"astro"}>Astro</MenuItem>
                            <MenuItem className='font-vzir text-sm text-text' value={"roxhin"}>Roxhin</MenuItem>
                            <MenuItem className='font-vzir text-sm text-text' value={"nika"}>Nika</MenuItem>

                        </Select>
                    </div >
                    <Button color='warning' className='mt-5' variant='outlined' onClick={() => submitHandler(currentThemeName)}>{t('Apply')}</Button>
                   
                </Box>
            </Modal>
        </Box>
    )
}

export default PouriaTheme
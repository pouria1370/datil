'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { AppContext } from '../../context/app-context';
import { LinkType } from '../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
const AddCommunication = () => {
  const [accardionToggle, setAccardionToggle] = useState<boolean>(false)
  const URL_REGEX = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
  const [formData, setformData] = useState<LinkType>({
    address:"",
    id:"",
    platform:{
      name:"",
      icon:""
    }
  })
  const [isError, setIsError] = useState<boolean | null>(null)
  const ctx = useContext(AppContext)
  const {t,i18n} = useTranslation()
  const [isRepeated, setIsRepeated] = useState(false)

console.log(isRepeated);

  const toggleHandler = () => {
    setAccardionToggle(prevState => !prevState)
    if(accardionToggle){ 
    setformData({address:"",platform:{name:"",icon:""},id: new Date().getSeconds()})
      ;setIsError(null)}
  }
  const linkchangeHandler = (e:any) => {
    setformData(prevState => ({...prevState,address:e.target.value}))
    setIsRepeated(false)
    
    if (e.target.value === "") {
       setIsError(null)
    }
    else if (ctx?.items.some(item => item.address === e.target.value)) {
      setIsRepeated(true)
      setIsError(true)
   }
    else if (URL_REGEX.test(e.target.value)) {
       setIsError(false)
    }
    else {
     setIsError(true)
    }
  }

  const addHandler = ()  => {
    if(formData.address && formData.platform.name)
    {
      setformData({address:"",platform:{name:"",icon:""},id:""})
      ctx?.addItem(formData)
      setAccardionToggle(false)
      setIsError(null)
    }
  }

  const SelectChangeHandler = (e:any) => {
    setformData(prevState => ({...prevState,platform:{name:e.target.value,icon:<EditIcon/>}}))
  }

  return (
    <div>
    <Accordion className='text-sm font-vazir bg-gray' expanded={accardionToggle} dir={i18n.language === 'fa'?'ltr':"rtl"} >
      <AccordionSummary
        
        aria-controls="panel1-content"
        onClick={toggleHandler}
        id="panel1-header"
        className={accardionToggle ? 'text-[0.7rem] text-light md:w-1/3 w-full':'text-[0.7rem] text-warning md:w-1/3 w-full'}
        disabled={accardionToggle}
      >
        <AddIcon className={accardionToggle ? 'text-[1rem] ml-3 text-light':'text-[1rem] ml-3 text-warning'} />
        {t('افزودن مسیر ارتباطی')}
      </AccordionSummary>
      <AccordionDetails>
       <form className='flex flex-col bg-light_gray bg-opacity-45 rounded-[1rem] p-10'>
            <div  className='flex flex-col sm:flex-row justify-between gap-4 items-baseline'>
              <Select
                value={formData.platform.name}
                label={t("نوع")}
                onChange={ SelectChangeHandler}
                className=' basis-2/6 '  
                color='warning'  
                fullWidth                      
              >
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("توییتر")}>{t('توییتر')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("اینستاگرام")}>{t('اینستاگرام')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("فیسبوک")}>{t('فیسبوک')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("وب سایت")}>{t('وب سایت')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("گیت هاب")}>{t('گیت هاب')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("تلگرام")}>{t('تلگرام')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa'?'ltr':'rtl'} className='font-vzir text-sm text-text' value={t("لینک دین")}>{t('لینک دین')}</MenuItem>
              </Select>
                <TextField fullWidth  FormHelperTextProps={isError !== null ? isError ? { className: "font-vazir text-sm text-danger" } :
                { className: "font-vazir text-sm text-success" } : undefined} helperText={isError!== null ? 
                  isError ? isRepeated ?t("لینک وارد شده تکراری است") : t("مقدار ورودی برای لینک نامعتبر است" ): t("مقدار ورودی معتبر است") : null} 
                  error={isError !== null && isError ? true : false} dir={i18n.language === 'fa'?'ltr':'rtl'}  value={formData.address}
                   onChange={(e) => linkchangeHandler(e)} InputLabelProps={{ className: "font-vazir focused:text-warning text-text_disablity" }} 
                   className='basis-4/6 font-vazir' id="outlined-basic" label={t("لینک")} variant="outlined" color='warning' />
            </div >
         
            <div className=' text-sm  flex md:flex-row flex-col text-nowrap justify-end gap-3 mt-10'>
              <Button className='font-vazir text-warning' color='warning' variant='outlined' onClick={toggleHandler}>{t('انصراف')}</Button>
              <Button onClick={ addHandler} disabled={isError === null || isError === true || !formData.platform.name}
               className={isError === null || isError === true || !formData.platform.name ? 
                'font-vazir text-text_disablity  bg-opacity-50 bg-light_gray' : "font-vazir text-dark bg-warning"}>{t('ثبت مسیر ارتباطی')} {t(formData.platform.name.toString())}</Button>
            </div>
       </form>
      </AccordionDetails>
    </Accordion>
 
  </div>
  )
}

export default AddCommunication




'use client'
import Accordion from '@mui/material/Accordion';
import EditIcon from '@mui/icons-material/Edit';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useContext,useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button,MenuItem, Modal, Select, TextField } from '@mui/material';
import { LinkType } from '../../types/types';
import { AppContext } from '../../context/app-context';
import { useTranslation } from 'react-i18next';
const Communication = ({ item }: { item: LinkType }) => {
  const [accardionToggle, setAccardionToggle] = useState<boolean>(false)
  const URL_REGEX = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
  const [formData, setformData] = useState<LinkType>({
    address: "",
    id: "",
    platform: {
      name: "",
      icon: ""
    }
  })
  const [isError, setIsError] = useState<boolean | null>(null)
  const ctx = useContext(AppContext)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [isModalShown, setIsModalShown] = useState<boolean>(false)
  const { t, i18n } = useTranslation()
  const [isRepeated, setIsRepeated] = useState(false)

  const toggleHandler = () => {
    setAccardionToggle(prevState => !prevState)
    setformData({ address: item.address, platform: { name: item.platform.name, icon: item.platform.icon }, id: item.id })
    if (accardionToggle) {
      setIsError(null)
    }
  }
  const linkchangeHandler = (e: any) => {
    setformData((prevState) => ({ ...prevState, address: e.target.value }))
    setIsRepeated(false)
    if (e.target.value === "") {
       setIsError(null)
    }
    else if (e.target.value === item.address) {
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
  const editHandler = () => {

    ctx?.updateItem(formData)
    setAccardionToggle(false)
    setIsError(null)
  }
  const SelectChangeHandler = (e: any) => {
    setformData(prevState => ({ ...prevState, platform: { name: e.target.value, icon: <EditIcon /> } }))
  }
  const checkDisablity = () => {
    if (isError === null && formData.platform.name === item.platform.name) return true
    if (isError === true) return true
    if (!formData.address) return true
    if (!formData.platform.name) return true
    if (formData.address === item.address && formData.platform.name === item.platform.name) return true
    else return false
  }

  const deleteHandler = () => {
    ctx?.removeItem(item)
    setIsConfirmed(false)
    setIsModalShown(false)
  }

  return (
    <div className='bg-smoky  rounded-[1rem] px-5 my-5'>
      <Accordion className='text-sm bg-smoky px-2 md:px-5 font-vazir' expanded={accardionToggle} dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} >
        <div className='flex flex-row justify-between items-baseline px-5'>
          <div dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='flex justify-around :flex-row gap-3 font-vazir text-sm text-light'>
            <span>{item.platform.icon}</span>
            <span>{item.platform.name}</span>
            <a><span className='text-warning'>{t('لینک')}:{item.address}</span></a>
          </div>
          <div className='flex flex-row gap-8'>
            <Button
              className="text-[0.8rem] font-vazir text-danger w-1/6'"
              onClick={() => setIsModalShown(true)}

            >
              <DeleteIcon className='ml-2' />
              <label>{t('حذف')}</label>
            </Button>
            <AccordionSummary

              aria-controls="panel1-content"
              onClick={toggleHandler}
              id="panel1-header"
              disabled={accardionToggle}
            >
              <Button
                className={accardionToggle ? 'text-[0.8rem] font-vazir text-text_disablity w-1/6' : 'text-[0.8rem] font-vazir text-warning w-1/6'}
              >
                <EditIcon className='ml-2' />
                <label  >{t('ویرایش')}</label>
              </Button>

            </AccordionSummary>
          </div>
        </div>

        <AccordionDetails>
          <form className='flex flex-col '>
            <div className='flex flex-col md:flex-row justify-between gap-4 items-baseline'>
              <Select
                value={formData.platform.name}
                label={t("نوع")}
                onChange={SelectChangeHandler}
                className='basis-2/6 text-text_disablity font-vazir '
                color='warning'
                fullWidth

              >
                <MenuItem dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='font-vzir text-sm text-text' value={t("اینستاگرام")}>{t('اینستاگرام')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='font-vzir text-sm text-text' value={t("فیسبوک")}>{t('فیسبوک')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='font-vzir text-sm text-text' value={t("وب سایت")}>{t('وب سایت')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='font-vzir text-sm text-text' value={t("گیت هاب")}>{t('گیت هاب')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='font-vzir text-sm text-text' value={t("تلگرام")}>{t('تلگرام')}</MenuItem>
                <MenuItem dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='font-vzir text-sm text-text' value={t("لینک دین")}>{t('لینک دین')}</MenuItem>
              </Select>
              <TextField fullWidth color='warning' FormHelperTextProps={isError !== null ? isError ? { className: "font-vazir text-sm text-danger" } :
                { className: "font-vazir text-sm text-success" } : undefined} helperText={isError !== null ? isError ? isRepeated ? t("لینک وارد شده تکراری است") :
                  t("مقدار ورودی برای لینک نامعتبر است") : t("مقدار ورودی معتبر است") : null} error={isError !== null && isError ?
                    true : false} dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} value={formData?.address} onChange={(e) => linkchangeHandler(e)}
                InputLabelProps={{ className: "font-vazir text-warning" }} className='basis-4/6 text-text_disablity font-vazir' id="outlined-basic"
                label={t("لینک")} variant="outlined" />
            </div >

            <div className=' text-sm  flex text-nowrap flex-row justify-end gap-3 mt-10'>
              <Button className='font-vazir text-warning' color='warning' variant='outlined' onClick={toggleHandler}>{t('انصراف')}</Button>
              <Button onClick={editHandler} disabled={checkDisablity()} className={checkDisablity() ? 'font-vazir text-text_disablity' : 'font-vazir bg-warning text-dark'}> {t('ویرایش مسیر ارتباطی')} {t(formData.platform.name.toString())}</Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <Modal
        open={isModalShown}
        onClose={() => {
          setIsModalShown(false)
          setIsConfirmed(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal

      >
        <Box
          className='flex flex-col md:w-1/2  absolute top-[50%] left-[50%]
           -translate-x-1/2 -translate-y-1/2 bg-gray rounded-[0.7rem] p-[4rem] w-full'
          dir={i18n.language === 'fa' ? 'ltr' : 'rtl'}
        >
          <div className='text-light font-vazir text-[1.5rem]'>
            {t('آیا از تصمیم خود مطمئن هستید؟')}
          </div>
          <div className='text-light font-vazir text-[1rem]'>
            {t("برای حذف مسیر ارتباطی وب سایت لطفا تایید را تایپ کنید")}
          </div>
          <TextField className='mt-5' color='warning'
            inputProps={{ className: "text-light focus:border-warning font-vazir placeholder:text-md border outline-none border-spacing-5" }}
            placeholder={t('تایید را تایپ کنید')} onChange={(e) => e.target.value === t("تایید") ? setIsConfirmed(true) :
              setIsConfirmed(false)} />
          <div dir={i18n.language === 'fa' ? 'ltr' : 'rtl'} className='flex flex-row mt-5 gap-4'>
            <Button
              className={!isConfirmed ? "bg-light_gray bg-opacity-25 font-vazir " : "bg-warning font-vazir text-light"}
              disabled={!isConfirmed}
              variant='contained'
              onClick={() => deleteHandler()}
            >
              <label>{t('حذف')}</label>
            </Button>
            <Button
              className="modal_buttons_warning font-vazir"
              onClick={() => {
                setIsModalShown(false)
                setIsConfirmed(false)
              }}
              color='warning'
              variant='outlined'
            >
              <label>{t('انصراف')}</label>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Communication




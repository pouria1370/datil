export type LinkType = {
    id:String | number | symbol
    address:String,
    platform: {
        icon:any,
        name:String
    }
}

export type ThemePouriaType = {
      background: string,
      primary:string ,
      secondary:string 
}

export interface AppContextType{
    theme: ThemePouriaType,
    changeTheme: (item:ThemePouriaType) => void,
    items:LinkType[],
    removeItem : (item:LinkType) => void,
    addItem : (item:LinkType) => void,
    updateItem : (item:LinkType) => void,
}
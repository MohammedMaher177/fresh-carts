import axios from "axios";
import { createContext, useContext, useEffect } from "react";

export let mainSliderContext = createContext();

export function MainSliderContextProvider(props) {
    async function getBrands(){
        return await axios.get(
          `https://route-ecommerce.onrender.com/api/v1/brands`
        ).then((res)=>{
            
        })
    }
    useEffect(()=>{
        getBrands();
    },[])
  return (
    <mainSliderContext.Provider value={{}}>
      {props.childern}
    </mainSliderContext.Provider>
  );
}

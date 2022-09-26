import { createContext, useEffect, useState } from "react";

  export const BagContext = createContext();

 const bagProvider =(props)=>{
    const [bag, setBag] = useState([]);

    return (
     <BagContext.Provider value={{ bag,setBag }}>
       {props.children}
     </BagContext.Provider>
   );
 };
 export default bagProvider;


  
import React from 'react';

import LayoutWrapper from "../../layouts/LayoutWrapper";

import style from "./styles";

const NotFound = () => {
    const { mainContainer, textContainer } = style();

    return ( 
        <LayoutWrapper>
            <div className={mainContainer}>
               <div className={textContainer}>404 Not Found</div>
            </div>
        </LayoutWrapper>
     );
}
 
export default NotFound;
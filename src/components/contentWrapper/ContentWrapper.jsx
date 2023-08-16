import React from "react";

import "./style.scss";

//***USE TO CENTER THE COMPONENTS WRAPPED IN THIS CONTENTWWRAPPER COMPONENT!!!

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
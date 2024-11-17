import React from "react";

import './Module.css';
import './../../assets/global.css';

interface ModuleProperties {
    topContent: JSX.Element;
    content: JSX.Element;
    bottomContent: JSX.Element;
}

export const Module: React.FC<ModuleProperties> = ({topContent, content, bottomContent}) => {
    return (
        <div className="module">
            <div className="module-box bg-color">
                <div className="module-top">
                    {topContent}
                </div>
                <div className="module-content">
                    {content}
                </div>
                <div className="module-bottom">
                    {bottomContent}
                </div>
            </div>
        </div>
    );
}
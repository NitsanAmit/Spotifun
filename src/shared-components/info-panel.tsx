import React, {CSSProperties, Dispatch, useState} from 'react';

export const InformationPanel: React.FunctionComponent<InformationPanelProps> = ({title, description, canDismiss = false}) => {

    const [dismissed, setDismissed] = useState<boolean>(false);
    return (
        <div style={dismissed ? {display: "None"} : containerStyle}>
            <div style={innerContainerStyle}>
                <h2 style={headerStyle}>{title}</h2>
                {
                    canDismiss && dismissButton(setDismissed)
                }
            </div>
            {description}
        </div>
    )
}

function dismissButton(setDismissed: Dispatch<React.SetStateAction<boolean>>) {
    return <span style={{cursor: "pointer"}} onClick={() => setDismissed(true)}>X</span>;
}

export interface InformationPanelProps {
    title: string;
    description: string;
    canDismiss?: boolean
}

const containerStyle: CSSProperties = {
    background: "pink",
    borderRadius: 10,
    padding: 8,
    width: "40%",
    margin: "16px auto",
    boxShadow: "1px 2px 4px 1px silver"
};

const innerContainerStyle: CSSProperties = {display: "flex", paddingLeft: 8};

const headerStyle: CSSProperties = {flex: 1, margin: "auto"};
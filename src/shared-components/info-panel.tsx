import React from 'react';

export const InformationPanel: React.FunctionComponent<InformationPanelProps> = ({title, description}) => {

    return (
        <div style={{background: "pink", borderRadius: 10, margin: 16, padding: 8}}>
            <h2>{title}</h2>
            <div style={{marginBottom: 16}}>{description}</div>
        </div>
    )
}

export interface InformationPanelProps {
    title: string;
    description: string;
}

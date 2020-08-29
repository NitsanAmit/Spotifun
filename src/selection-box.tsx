import React, {CSSProperties} from 'react';


export const SelectionBox: React.FunctionComponent<SelectionBoxProps> = ({styles,id, label, backgroundImage, isSelected, onItemSelect}) => {

    return (
        <div
            id={id}
            className={`selection-box${isSelected ? ' selection-box-selected' : ''}`}
            onClick={onItemSelect}
            style={{...styles, backgroundImage: `url(${backgroundImage})`}}
        >
            <h3>{label}</h3>
        </div>
    )
};

interface SelectionBoxProps {
    styles: CSSProperties;
    id: string,
    label: string,
    backgroundImage: string,
    isSelected: boolean;
    onItemSelect: (event: any) => void;
}
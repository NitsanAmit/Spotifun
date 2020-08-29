import React, {CSSProperties} from 'react';


export const SelectionBox: React.FunctionComponent<SelectionBoxProps> = ({styles,id, label, backgroundImage, isSelected, onItemSelect}) => {

    const onClick = (selectedItem: React.MouseEvent) => {
        onItemSelect(selectedItem.currentTarget.id);
    }

    return (
        <div
            id={id}
            className={`selection-box${isSelected ? ' selection-box-selected' : ''}`}
            onClick={onClick}
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
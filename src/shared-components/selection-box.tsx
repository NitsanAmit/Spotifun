import React from 'react';
import {observer} from "mobx-react";

export const SelectionBox: React.FunctionComponent<SelectionBoxProps> = observer(({additionalClass,id, label, backgroundImage, isSelected, onItemSelect}) => {

    const onClick = (selectedItem: React.MouseEvent) => {
        onItemSelect(selectedItem.currentTarget.id);
    }

    return (
        <div
            id={id}
            className={`selection-box${isSelected ? ' selection-box-selected' : ''} ${additionalClass}`}
            onClick={onClick}
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            <h3>{label}</h3>
        </div>
    )
})

interface SelectionBoxProps {
    additionalClass: string;
    id: string,
    label: string,
    backgroundImage: string,
    isSelected: boolean;
    onItemSelect: (itemId: string) => void;
}
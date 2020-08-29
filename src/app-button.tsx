import React from 'react';
import './styles/buttons.css'

export const AppButton: React.FunctionComponent<AppButtonProps> = ({label, onButtonClick, url, disabled}) => {

    return (
        <a className="no-decorations" href={url} >
            <button className="app-btn" onClick={onButtonClick} disabled={disabled}>
                {label}
            </button>
        </a>
    )
}

interface AppButtonProps {
    label: string;
    url?: string;
    disabled?: boolean;
    onButtonClick?: (event: React.MouseEvent) => void;
}


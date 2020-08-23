import React from 'react';

export const AppButton: React.FunctionComponent<AppButtonProps> = ({label, className, onButtonClick}) => {

    return (
        <button
            className={className}
            onClick={onButtonClick}
        >
            {label}
        </button>
    )
}

interface AppButtonProps {
    label: string;
    className?: string;
    onButtonClick: (event: any) => void;
}


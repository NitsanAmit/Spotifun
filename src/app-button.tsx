import React from 'react';

export const AppButton: React.FunctionComponent<AppButtonProps> = (props: AppButtonProps) => {

    const {label, className, onButtonClick} = props;

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


import React from 'react';

export const AppButton: React.FunctionComponent<AppButtonProps> = (props: AppButtonProps) => {

    const {text, className, onButtonClick} = props;

    return (
        <button
            className={className}
            onClick={onButtonClick}
        >
            {text}
        </button>
    )
}

interface AppButtonProps {
    text: string;
    className: string;
    onButtonClick: (event: any) => void;
}


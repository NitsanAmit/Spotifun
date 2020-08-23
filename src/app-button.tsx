import React from 'react';

export const AppButton: React.FunctionComponent<AppButtonProps> = ({label, className, url}) => {

    return (
        <a
            className={className}
            href={url}
        >
            {label}
        </a>
    )
}

interface AppButtonProps {
    label: string;
    className?: string;
    url: string;
}


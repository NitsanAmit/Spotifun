import React, {Dispatch, useState} from 'react';
import styled from 'styled-components';

export const InformationPanel: React.FunctionComponent<InformationPanelProps> = ({title, description, canDismiss = false}) => {

    const [dismissed, setDismissed] = useState<boolean>(false);
    return (
        <StyledDismissiblePanel dismissed={dismissed}>
            <StyledInnerContainer>
                <StyledHeader>
                    {title}
                </StyledHeader>
                {
                    canDismiss && dismissButton(setDismissed)
                }
            </StyledInnerContainer>
            {description}
        </StyledDismissiblePanel>
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

const DismissiblePanel = (props: any) => <div {...props}/>

const StyledDismissiblePanel = styled(DismissiblePanel)`
    background: pink;
    border-radius: 10px;
    padding: 8px;
    width: 40%;
    margin: 16px auto;
    box-shadow: 1px 2px 4px 1px silver;
    text-align: center;
    display: ${(props: any) => props.dismissed ? 'none' : 'block'};
`,
    StyledInnerContainer = styled.div`
    display: flex;
    padding-left: 8px;
`,
    StyledHeader = styled.h2`
    flex: 1;
    margin: auto;
`;

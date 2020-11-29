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
    background: #ff7676;
    border-radius: 10px;
    padding: 8px;
    width: 70%;
    margin: 16px auto;
    box-shadow: 1px 1px 2px 0px silver;
    text-align: center;
    color: white;
    display: ${(props: any) => props.dismissed ? 'none' : 'block'};
`,
    StyledInnerContainer = styled.div`
    display: flex;
    padding-left: 8px;
`,
    StyledHeader = styled.h3`
    flex: 1;
    margin: auto;
    color: white;
`;

import React from "react";
import styled from "styled-components";

const BaseSpinner: React.FunctionComponent<BaseSpinnerProps & React.BaseHTMLAttributes<HTMLDivElement>> = (props) =>
    <div {...props} />;

interface BaseSpinnerProps {
    size?: SpinnerSize;
    backgroundColor?: string;
}

export enum SpinnerSize{
    small,
    medium,
    large
}
export const Spinner = styled(BaseSpinner)`
    font-size: 10px;
    margin: auto;
    text-indent: -9999em;
    ${(props: any) => {
        let size;
        if (props.size === SpinnerSize.large) {
            size = '6em';
        } else if( props.size === SpinnerSize.small) {
            size = '16px';
        } else {
            size = '3em';
        }
        return {
            width: size,
            height: size,
        }
    }}
    background: #ff6767;
    border-radius: 50%;
    background: -moz-linear-gradient(left, #ff6767 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #ff6767 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #ff6767 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #ff6767 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #ff6767 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    &:before {
        width: 50%;
        height: 50%;
        background: #ff6767;
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: '';
    }
    &:after {
        background: ${(props: any) =>  props.backgroundColor || '#f8f8f8'};
        width: 75%;
        height: 75%;
        border-radius: 50%;
        content: '';
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    @-webkit-keyframes load3 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load3 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }`
;
import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

import transparency from "../../defaults/transparency";

import typography from "../../mixins/typography";

import Theme from "../../enums/theme";

const getFocusLineWidth = (props: IFocusLineProps) => {
  return (!props.focused && !props.error) || props.disabled ? 0 : 100;
};

const getFocusLineBackgroundColor = (props: IFocusLineProps) => {
  return props.error ? props.errorColor : props.color;
};

const getHelperTextColor = (props: IHelperTextProps) => {
  if (props.error) {
    return props.errorColor;
  }

  return props.theme === Theme.Light ? "#000" : "#fff";
};

const getHelperTextOpacity = (props: IHelperTextProps) => {
  if (props.disabled) {
    return props.theme === Theme.Light
      ? transparency.light.text.disabled
      : transparency.dark.text.disabled;
  } else if (props.error) {
    return transparency.light.text.primary;
  }

  return props.theme === Theme.Light
    ? transparency.light.text.secondary
    : transparency.dark.text.secondary;
};

const getInputOpacity = (props: IInputProps) => {
  if (props.isDisabled) {
    return props.theme === Theme.Light
      ? transparency.light.text.disabled
      : transparency.dark.text.disabled;
  }

  return transparency.light.text.primary;
};

const getInputTextColor = (props: IInputProps) => {
  const color = props.theme === Theme.Light ? 0 : 255;

  return `0px 0px 0px rgba(${color},${color},${color},${getInputOpacity(
    props
  )})`;
};

const getInputCursorColor = (props: IInputProps) => {
  return !props.error ? props.color : props.errorColor;
};

const getLabelColor = (props: ILabelProps) => {
  if (props.error) {
    return props.errorColor;
  } else if (!props.focused || props.disabled) {
    return props.theme === Theme.Light ? "#000" : "#fff";
  }

  return props.color;
};

const getLabelOpacity = (props: ILabelProps) => {
  if (props.disabled) {
    return props.theme === Theme.Light
      ? transparency.light.text.disabled
      : transparency.dark.text.disabled;
  } else if (props.error || props.focused) {
    return transparency.light.text.primary;
  } else if (props.theme === Theme.Dark) {
    return transparency.dark.text.secondary;
  }

  return transparency.light.text.secondary;
};

const getLineBackgroundColor = (props: ILineProps) => {
  return props.theme === Theme.Light
    ? "rgba(0,0,0,0.42)"
    : "rgba(255,255,255,0.70)";
};

export interface IFocusLineProps {
  focused: boolean;
  error: boolean;
  errorColor: string;
  color: string;
  disabled: boolean;
}

export const FocusLine = styled.div`
  width: ${(props: IFocusLineProps) => getFocusLineWidth(props) + "%"};
  height: 2px;
  margin-top: -1.5px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => getFocusLineBackgroundColor(props)};
  transition: 0.2s width ease-out, 0.2s background-color;
`;

export interface IHelperTextProps {
  theme: Theme;
  error: boolean;
  errorColor: string;
  disabled: boolean;
}

export const HelperText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${(props: IHelperTextProps) => getHelperTextColor(props)};
  opacity: ${props => getHelperTextOpacity(props)};
  transition: 0.2s opacity, 0.2s color;
`;

export interface IInputProps {
  color: string;
  theme: Theme;
  error: boolean;
  errorColor: string;
  isDisabled: boolean;
}

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  -webkit-text-fill-color: transparent;
  background-color: transparent;
  text-shadow: ${(props: IInputProps) => getInputTextColor(props)};
  padding-top: 8px;
  padding-bottom: 8px;
  color: ${props => getInputCursorColor(props)};

  &:focus {
    outline: none;
  }
`;

export interface ILabelProps {
  color: string;
  top: boolean;
  focused: boolean;
  error: boolean;
  errorColor: string;
  theme: Theme;
  disabled: boolean;
}

export const Label = styled.div`
  font-size: ${(props: ILabelProps) => (!props.top ? 16 : 12)}px;
  color: ${props => getLabelColor(props)};
  opacity: ${props => getLabelOpacity(props)};
  position: absolute;
  top: ${props => (!props.top ? 20 : 0)}px;
  transition: 0.2s top ease-out, 0.2s font-size, 0.2s opacity, 0.2s color;
`;

export interface ILineProps {
  theme: Theme;
  disabled: boolean;
}

export const Line = styled.div`
  width: 100%;
  height: ${(props: ILineProps) => (!props.disabled ? 1 : 0)}px;
  ${props =>
    !props.disabled &&
    `background-color: ${getLineBackgroundColor(props)};`} ${props =>
    props.disabled && `border: 1px dashed ${getLineBackgroundColor(props)};`};
`;

export const StyledTextField = styled.div`
  position: relative;
  width: 196px;
  padding-top: 12px;
  user-select: none;
  cursor: text;
  ${typography.robotoRegular()};
`;

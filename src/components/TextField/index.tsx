import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";

import FocusLine from "./FocusLine";
import HelperText from "./HelperText";
import Input from "./Input";
import Label from "./Label";
import Line from "./Line";
import StyledTextField from "./StyledTextField";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  theme?: Theme;
  color?: string;
  label?: string;
  helperText?: string;
  errorColor?: string;
  errorReason?: string;
  value?: string;
  validate?: (value: string, submit: boolean) => void;
}

interface IState {
  focused: boolean;
  filled: boolean;
  error: boolean;
}

export default class TextField extends React.Component<IProps, IState> {
  public static defaultProps = {
    disabled: false,
    color: colors.blue["500"],
    theme: Theme.Light,
    errorColor: "#FF1744",
  };

  public state: IState = {
    focused: false,
    filled: false,
    error: false,
  };

  private input: HTMLInputElement;

  public componentDidMount() {
    setTimeout(() => {
      const {
        value,
      } = this.props;

      if (this.props.value != null) {
        this.input.value = value;
        this.toggle(true);
      }
    });
  }

  public onFocus = () => {
    if (this.props.disabled) { return; }
    this.toggle(true);
  }

  public onBlur = () => {
    if (this.props.disabled) { return; }
    this.validate(true);

    this.toggle(false);
  }

  public toggle = (flag: boolean) => {
    const isInputEmpty = this.input.value.length === 0;

    this.setState({
      filled: !isInputEmpty,
      focused: flag,
    });
  }

  /**
   * @param submit - if false then its from typing.
   */
  public validate(submit: boolean) {
    const {
      validate,
    } = this.props;

    if (typeof validate === "function") {
      setTimeout(() => {
        const isCorrect = validate(this.input.value, submit);

        this.setState({error: !isCorrect});
      });
    }
  }

  public onKeyDown = (e) => {
    this.validate(e.key === "Enter");
  }

  public render() {
    const {
      className,
      style,
      disabled,
      theme,
      children,
      color,
      label,
      helperText,
      errorColor,
      errorReason,
    } = this.props;

    const {
      focused,
      filled,
      error,
    } = this.state;

    return (
      <StyledTextField className={className} style={style}>
        {label != null &&
          <Label
            color={color}
            top={focused || filled}
            focused={focused}
            error={error}
            errorColor={errorColor}
            theme={theme}
            disabled={disabled}>
            {label}
          </Label>
        }
        <Input
          type="text"
          disabled={disabled}
          color={color}
          theme={theme}
          error={error}
          errorColor={errorColor}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          spellCheck={false}
          isDisabled={disabled}
          innerRef={r => (this.input = r)} />
        <Line theme={theme} disabled={disabled} />
        <FocusLine
          color={color}
          focused={focused}
          error={error}
          errorColor={errorColor}
          disabled={disabled} />
        {(helperText != null || error) &&
          <HelperText
            theme={theme}
            error={error}
            errorColor={errorColor}
            disabled={disabled}>
            {!error ? helperText : errorReason}
          </HelperText>
        }
      </StyledTextField>
    );
  }
}
import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "../common/Button";
import "./index.scss";
import { getAllCookieNames } from "../../helpers/getAllCookieNames";
import { resetCookies } from "../../helpers/resetCookies";
import { Title } from "../common/Title";
import { Text } from "../common/Text";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  info?: ErrorInfo;
  errorTime?: Date;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info, errorTime: new Date() });
  }

  fixApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    const cookieNames = getAllCookieNames();
    cookieNames.forEach((cookieName) => {
      resetCookies(cookieName, "");
    });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Title
            className="something-wrong__title"
            title="It seems something went wrong..."
          />
          <div className="something-wrong">
            <Text
              className="something-wrong__info"
              text={
                this.state.error
                  ? this.state.error.toString()
                  : "Error is unknown"
              }
            />
            <Text
              className="something-wrong__info"
              text={
                this.state.info
                  ? this.state.info.componentStack
                  : "Error information is unknown"
              }
            />
            <Text
              className="something-wrong__info"
              text={
                this.state.errorTime
                  ? this.state.errorTime.toString()
                  : "The time of the error is unknown"
              }
            />
            <Button onClick={this.fixApp} className="somethingWrongInfo__btn">
              try to fix the app
            </Button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

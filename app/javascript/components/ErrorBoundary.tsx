import React, { ReactNode } from "react";
import { Button } from "./button";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  public state = { error: null };

  public componentDidCatch(error: Error): void {
    this.setState({ error });
  }

  public render(): ReactNode {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <div role="alert" className="w-full py-10">
          <div className="bg-gray-800 rounded-3xl p-4 xs:p-6 tracking-wide flex items-center justify-center space-y-4 flex-col mx-auto max-w-md">
            <p>Oops! Something went wrong.</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

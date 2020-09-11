import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { DispatchProps, mapDispatchToProps } from "./app/mapDispatchToProps";
import { ApplicationInitialized } from "./app/event/ApplicationInitialized";
import Offer from "./view/Offer";
import { RouteComponentProps, withRouter } from "react-router";

type Props = DispatchProps & RouteComponentProps<{id: string, user?: string}>;

class App extends React.PureComponent<Props> {
  public componentDidMount(): void {
    this.props.dispatch(new ApplicationInitialized(this.props.match.params.id, this.props.match.params.user || 'anonymous'));
  }

  public render(): JSX.Element {
    return (
        <div className="App">
            <Offer/>
        </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(withRouter(App));

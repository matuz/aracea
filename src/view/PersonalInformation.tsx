import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { State } from "../app/store";
import { mapDispatchToProps, DispatchProps } from "../app/mapDispatchToProps";
import { NameChanged } from "../app/event/NameChanged";
import { SurnameChanged } from "../app/event/SurnameChaned";
import { EmailChanged } from "../app/event/EmailChanged";

interface StateProps {
    name: string;
    surname: string;
    email: string;
}

type Props = StateProps & DispatchProps;

export class PersonalInformation extends React.PureComponent<Props> {
    render() {
        return <div className={"personalInformation"}>
            <label htmlFor={'name'}>Imię</label><input name={'name'} type={"text"} onChange={this.changeName} value={this.props.name} />
            <label htmlFor={'surname'}>Nazwisko</label><input name={'surname'} type={"text"} onChange={this.changeSurname} value={this.props.surname} />
            <label htmlFor={'email'}>Email</label><input name={'email'} type={"email"} onChange={this.changeEmail} value={this.props.email} />
        </div>;
    }

    private changeName = (event: ChangeEvent<HTMLInputElement>): void => {
        this.props.dispatch(new NameChanged(event.currentTarget.value));
    };
    private changeSurname = (event: ChangeEvent<HTMLInputElement>): void => {
        this.props.dispatch(new SurnameChanged(event.currentTarget.value));
    };
    private changeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        this.props.dispatch(new EmailChanged(event.currentTarget.value));
    };
}

const mapStateToProps = (state: State): StateProps => ({
    name: state.order.name,
    surname: state.order.surname,
    email: state.order.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);

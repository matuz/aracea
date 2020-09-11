import React, { ChangeEvent } from 'react';
import { connect } from "react-redux";
import { State } from "../app/store";
import { Offer as OfferModel } from "../app/model/offer";
import { PlantRecord } from "./PlantRecord";
import { Order, OrderItem } from "../app/model/order";
import PersonalInformation from "./PersonalInformation";
import { DispatchProps, mapDispatchToProps } from "../app/mapDispatchToProps";
import { AmountChanged } from "../app/event/AmountChanged";
import { OrderSendRequested } from "../app/event/OrderSendRequested";

interface ComponentState {
    isTotalValid: boolean;
    isNameValid: boolean;
    isSurnameValid: boolean;
    isEmailValid: boolean;
    isLicenceChecked: boolean;
}

interface StateProps {
    offer: OfferModel;
    order: Order;
}

type Props = StateProps & DispatchProps;

export class Offer extends React.PureComponent<Props, ComponentState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isTotalValid: false,
            isNameValid: false,
            isSurnameValid: false,
            isEmailValid: false,
            isLicenceChecked: false,
        };
    }

    componentDidUpdate() {
        this.setState({
            ...this.state,
            isTotalValid: this.countTotal() > 0,
            isNameValid: this.props.order.name.length > 3,
            isEmailValid: this.props.order.email.length > 3,
            isSurnameValid: this.props.order.surname.length > 3,
        });
    }

    public render(): JSX.Element {
        return <div className={'offer'}>
            <h1>{this.props.offer.name}</h1>
            <div className={'plants'}>
                {this.props.offer.plants && this.props.offer.plants.length > 0 ?
                    this.props.offer.plants.map(plant => (
                        <PlantRecord
                            key={plant.id}
                            amount={this.props.order.items.find(item => item.plantId === plant.id)?.amount || 0}
                            plant={plant}
                            currency={this.props.offer.currency}
                            onChange={this.changeAmount(plant.id)}
                        />
                    )) : <span>Brak roślin w ofercie</span>
                }
            </div>
            <div>
                <span>W sumie {this.countTotal()} {this.props.offer.currency}</span>
            </div>
            <PersonalInformation/>
            <input type={'checkbox'} name={'licence'} id={'licence'} onChange={this.changeLicence}/> <label htmlFor={'licence'}>Zapoznałem
            się i w pełni zgadzam się z regulaminem zamówienia grupowego</label>
            <button onClick={this.send} disabled={!this.isValid()}>Wyślij zgłoszenie</button>
        </div>;
    }

    private changeAmount = (id: string) => (amount: number): void => this.props.dispatch(new AmountChanged(id, amount));

    private changeLicence = (event: ChangeEvent<HTMLInputElement>): void => this.setState({ ...this.state, isLicenceChecked: event.currentTarget.checked });

    private countTotal = (): number => this.props.order.items.reduce(
        (sum: number, item: OrderItem) => sum + item.amount * this.props.offer.plants.find(plant => plant.id === item.plantId)!.price,
        0
    )

    private isValid = (): boolean => this.state.isEmailValid && this.state.isLicenceChecked && this.state.isNameValid && this.state.isSurnameValid && this.state.isTotalValid;

    private send = (): void => {
        this.isValid() && this.props.dispatch(new OrderSendRequested());
    }
}

const mapStateToProps = (state: State): StateProps => ({
    offer: state.offer,
    order: state.order,
});

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
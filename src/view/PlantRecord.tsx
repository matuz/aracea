import React, { ChangeEvent } from 'react';
import { Plant } from "../app/model/plant";

interface Props {
    amount: number;
    currency: string;
    plant: Plant;
    onChange: (amount: number) => void;
}

export class PlantRecord extends React.PureComponent<Props> {
    public render(): JSX.Element {
        return <div className={'plantRecord'}>
            <span className={'name'}>{this.props.plant.name}</span>
            <span className={'price'}>{this.props.plant.price}</span>
            <span className={'currency'}>{this.props.currency}</span>
            <input type={'number'} value={this.props.amount} onChange={this.onChangeAmount}/>
            <button onClick={this.resetAmount}>X</button>
            <input type={'text'} readOnly={true} value={this.props.plant.price * this.props.amount}/>
        </div>
    }

    private onChangeAmount = (event: ChangeEvent<HTMLInputElement>): void => this.props.onChange(Number(event.currentTarget.value))
    private resetAmount = (): void => this.props.onChange(0);
}
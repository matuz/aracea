import { Dispatch } from "redux";
import Event from "./event/event";

export interface DispatchProps {
    dispatch: (event: Event) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    dispatch: event => dispatch(event)
});

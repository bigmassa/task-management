export interface IHttp {
    pendingRequests: number;
}

export type State = IHttp;

export const initialState: State = {
    pendingRequests: 0
};

export function reducer(state = initialState, action: any): State {
    const actionPrefix = '[Http]';

    switch (action.type) {

        case `${actionPrefix} INCREMENT_PENDING`: {
            return {
                pendingRequests: state.pendingRequests + 1
            };
        }

        case `${actionPrefix} DECREMENT_PENDING`: {
            return {
                pendingRequests: state.pendingRequests - 1
            };
        }

        default:
            return state;
    }
}

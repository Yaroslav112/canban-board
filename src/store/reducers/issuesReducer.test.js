import { issuesReducer } from "./issuesReducer";
import { DRAG_HAPPENED, SAVE_ISSUES, SET_ISSUES } from "../actions";

describe('issuesReducer', () => {
    const initialState = {
        issues: [
            { id: '1', state: 'state:false' },
            { id: '2', state: true },
            { id: '3', state: false },
        ],
    };

    it('should handle DRAG_HAPPENED action', () => {
        const action = {
            type: DRAG_HAPPENED,
            payload: {
                state: false,
                droppableIdStart: 'column1',
                draggableId: '1',
                droppableIdEnd: 'column2',
                droppableIndexEnd: 1,
                droppableIndexStart: 0,
                type: 'TYPE',
                data: [],
            },
        };

        const expectedState = {
            issues: [
                { id: '2', state: true },
                { id: '1', state: 'column2' },
                { id: '3', state: false },
            ],
        };

        const newState = issuesReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it('should handle SAVE_ISSUES action', () => {
        const action = {
            type: SAVE_ISSUES,
            payload: {
                data: [
                    { id: '4', state: true },
                    { id: '5', state: false },
                ],
            },
        };

        const expectedState = {
            issues: [
                { id: '4', state: true },
                { id: '5', state: false },
            ],
        };

        const newState = issuesReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it('should handle SET_ISSUES action', () => {
        const action = {
            type: SET_ISSUES,
            payload: [
                { id: '4', state: true },
                { id: '5', state: false },
            ],
        };

        const expectedState = {
            issues: [
                { id: '4', state: true },
                { id: '5', state: false },
            ],
        };

        const newState = issuesReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });
});

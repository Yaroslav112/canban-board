import { DRAG_HAPPENED, SAVE_ISSUES, SET_ISSUES } from "../actions";

export const initialState = {
    issues: [],
};

export const issuesReducer = (state: any = initialState, action: {
    type: any; payload: {
        state: Boolean | boolean;
        droppableIdStart: any; draggableId: any; droppableIdEnd: any;
        droppableIndexEnd: any; droppableIndexStart: any; type: any; data: any[];
    };
}) => {
    switch (action.type) {
        case DRAG_HAPPENED: {
            return {
                ...state,
                issues: state.issues.reduce((res: any, issue: {
                    state: Boolean;
                    id: any;
                }) => {
                    if (issue?.id?.toString() !== action.payload.draggableId || action.payload.droppableIdStart === action.payload.droppableIdEnd) {
                        const newIssues = [...state.issues]

                        const filteredIssues = newIssues.filter((issue: { id: { toString: () => any; }; }) => issue.id.toString() !== action.payload.draggableId);
                        const draggedIssue = newIssues.find((issue: { id: { toString: () => any; }; }) => issue.id.toString() === action.payload.draggableId);

                        draggedIssue.state = action.payload.droppableIdEnd;
                        filteredIssues.splice(action.payload.droppableIndexEnd, 0, draggedIssue);

                        return [...filteredIssues];
                    }

                    return [...res, {
                        ...issue,
                        state: action.payload.droppableIdEnd
                    }]
                }, [])
            }
        }
        case SAVE_ISSUES: {
            return {
                ...state,
                issues: action.payload.data,
            }
        }
        case SET_ISSUES:
            return {
                ...state,
                issues: action.payload
            };
    }
    return state;
};

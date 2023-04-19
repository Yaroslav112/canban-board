export const DRAG_HAPPENED = "DRAG_HAPPENED";
export const SAVE_ISSUES = "SAVE_ISSUES";
export const SET_ISSUES = "SET_ISSUES";

export const setIssuesAction = (issues: any) => {
    return {
        type: SET_ISSUES,
        payload: issues
    };
};




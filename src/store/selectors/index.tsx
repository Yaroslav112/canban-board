import { RootState } from "../reducers";

export const allIssues = (state: RootState) => state.issues;
export const openedIssues = (state: RootState) => state.issues.filter(issue => issue.state === 'open');
export const inProgressIssues = (state: RootState) => state.issues.filter(issue => issue.state === 'inProgress');
export const doneIssues =(state: RootState) => state.issues.filter(issue => issue.state === 'done');
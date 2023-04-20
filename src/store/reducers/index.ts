import { combineReducers } from "redux";
import { issuesReducer } from "./issuesReducer";

export interface RootState {
    issues: {
        html_url: any;
        length: Boolean;
        id: number;
        title: string;
        state: 'open' | 'inProgress' | 'done';
        // @ts-ignore
        filter(param: (issue: any) => boolean);
        map(param: (link: {html_url: any}) => any): any;
    }
}

export default combineReducers({
    issues: issuesReducer,
});
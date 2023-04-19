import React, { FC, useEffect } from "react";
import { Row } from "antd";
// @ts-ignore
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setIssuesAction } from "./store/actions";
import Column from "./components/column";
import SearchInput from "./components/search-input";
import {
    allIssues as allIssuesSelector,
    openedIssues as openedIssuesSelector,
    inProgressIssues as inProgressIssuesSelector,
    doneIssues as doneIssuesSelector,
} from "./store/selectors"

const App: FC = () => {
    const dispatch = useDispatch();
    const allIssues = useSelector(allIssuesSelector);
    const openedIssues = useSelector(openedIssuesSelector);
    const inProgressIssues = useSelector(inProgressIssuesSelector);
    const doneIssues = useSelector(doneIssuesSelector);
    console.log(allIssues, 'allIssues')
    useEffect(() => {
        const allIssuesString = sessionStorage.getItem('issues');

        if (allIssuesString) {
            const allIssuesArray = JSON.parse(allIssuesString);
            dispatch(setIssuesAction(allIssuesArray));
        }
    }, [dispatch]);

    useEffect(() => {
        const allIssuesString = JSON.stringify(allIssues);
        sessionStorage.setItem('issues', allIssuesString);
    }, [allIssues]);

    const onDragEnd = (result: any) => {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        dispatch({
            type: 'DRAG_HAPPENED',
            payload: {
                droppableIdStart: source.droppableId,
                droppableIdEnd: destination.droppableId,
                droppableIndexEnd: destination.index,
                droppableIndexStart: source.index,
                draggableId: draggableId,
                type: type,
            },
        });
    };

    const columnsData = [
        {
            id: 'open',
            array: openedIssues,
            span: 15,
            title: 'To Do'
        },
        {
            id: 'inProgress',
            array: inProgressIssues,
            span: 8,
            title: 'In Progress',
        },
        {
            id: 'done',
            array: doneIssues,
            span: 8,
            title: 'Done',
        },
    ]

    return (
        <div style={{padding: '16px'}}>
            <h1>Load GitHub Repository Issues</h1>
            <SearchInput />
            {allIssues?.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Row gutter={16}>
                        {columnsData.map((i) => (
                            <Column
                                id={i.id}
                                array={i.array}
                                span={i.span}
                                title={i.title}
                                key={i.id}
                            />
                        ))}
                    </Row>
                </DragDropContext>
            ) : (
                <p>No issues to display.</p>
            )}
        </div>
    );
};

export default App;

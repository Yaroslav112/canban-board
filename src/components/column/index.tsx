import { Card, Col } from "antd";
import React, { FC } from "react";
// @ts-ignore
import { Droppable, Draggable } from "react-beautiful-dnd";

interface ColumnProps {
    id?: string;
    array?: [];
    span?: number;
    title?: string;
}

const Column: FC<ColumnProps> = (
    {
        id,
        array = [],
        span,
        title
    }) => {
    return (
        <Droppable droppableId={id}>
            {(provided: any) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{flex: 1}}
                >
                    <Col span={span}>
                        <Card title={title} style={{height: '100%', width: '400px', overflowY: 'auto'}}>
                            {array.map((issue: {
                                html_url: any;
                                number: number;
                                id: React.Key | null | undefined;
                                title: string;
                                comments: string;
                                user: any;
                            }, index: any) => (
                                <Draggable
                                    key={issue.id}
                                    draggableId={issue?.id?.toString()}
                                    index={index}
                                >
                                    {(provided: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card style={{marginBottom: '20px',}}>
                                                <p style={{fontWeight: '700'}}>{issue.title}</p>
                                                <p>#{issue.number}</p>
                                                <p style={{margin: '0'}}>
                                                    user: {issue?.user?.login} |
                                                    comments: {issue?.comments}
                                                </p>
                                                <a target='_blank' href={issue.html_url}>Check Issue</a>
                                            </Card>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </Card>
                    </Col>
                </div>
            )}
        </Droppable>
    )
}
export default Column
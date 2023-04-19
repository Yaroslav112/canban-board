import { Button, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SearchInput = () => {
    const [repoUrl, setRepoUrl] = useState('https://github.com/neptunian/react-photo-gallery/issues');
    const dispatch = useDispatch();

    const handleLoadIssues = async () => {
        console.log('Loading issues from repository:', repoUrl);
        try {
            const repoParts = repoUrl.split('/');
            const owner = repoParts[3];
            const repoName = repoParts[4];

            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repoName}/issues`
            );
            if (response.ok) {
                const json = await response.json();
                dispatch({
                        type: 'SAVE_ISSUES',
                        payload: {
                            data: json
                        },
                    }
                )
            } else {
                console.error(
                    `Failed to fetch issues: ${response.status} ${response.statusText}`
                );
            }
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    return(
        <Row gutter={16} style={{marginBottom: '16px'}}>
            <Col span={10}>
                <Input
                    placeholder='Enter repository URL'
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                />
            </Col>
            <Col span={6}>
                <Button onClick={handleLoadIssues}>Load Issues</Button>
            </Col>
        </Row>
    )
}

export default SearchInput;
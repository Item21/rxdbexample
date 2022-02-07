import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as Database from "../Database"
import React, { useEffect, useState } from 'react'
import { IssueData } from '../types';
import { RxDatabase } from 'rxdb';
import { Grid, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {};

type IssuesLoading = {
    issues: any[]
    loading: boolean
}

const ListIssues = (props: Props) => {    
    useEffect(() => {
        async function setData() {
            const database = await Database.get()

            database.issues.find({
                selector: {},
                sort: [
                    { title: 'asc' }
                ]
            }).$.subscribe(issuesObserver => {
                console.log("HERE", issuesObserver)
                if (!issuesObserver)
                    return

                let issues : any[] = []
                issuesObserver.map((issue, index) => {
                    issues = [...issues, {
                        id: index,
                        title: issue.title,
                        description: issue.description,
                        modelId: issue.modelId
                    }]
                })
                setIssues({
                    issues: issues,
                    loading: false
                })
            })

        };
        setData().then(() => console.log("DATABASE"))
    }, [])
    

    const [issues, setIssues] = useState<IssuesLoading>({
        issues: null,
        loading: true
    })
    const navigator = useNavigate()

    const columns : GridColumns = [
        {
            field: "title",
            flex: 1,
            type: "string",
            valueFormatter: (value: any) => value.value,
            renderHeader: (params: any) => {
                return <span>title</span>
            }
        },
        {
            field: "description",
            flex: 1,
            type: "string",
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>description</span>
            }
        },
        {
            field: "modelId",
            flex: 1,
            type: "string",
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>modelId</span>
            }
        },
    ]

    if (!issues.issues)
        return <div>NO ISSUES</div>

    return (
        <Card placeholder="Issues List" title='Issues List'>
            <Button onClick={() => {navigator("/insert")}}>Navigate to Insert</Button>
            <Grid container height="100vh" maxHeight="450px">
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={issues.issues}
                        columns={columns}
                        onRowClick={(e) => {navigator("/issue/" + e.row.title)}}
                    ></DataGrid>
                </div>
            </Grid>
        </Card>
    )
};

export default ListIssues;

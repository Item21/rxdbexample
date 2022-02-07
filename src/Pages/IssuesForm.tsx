import React, { useEffect, useState } from 'react'
import * as Database from "../Database"
import {Button, Grid, TextField, Card} from "@mui/material"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';

const IssuesForm = () => {
    useEffect(() => {
        async function setData() {
            const database = await Database.get()
            setIssueProperties(database.issues.schema.jsonSchema.properties)
        }

        setData().then(() => console.log("DATABASE"))
    }, [])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            modelId: ""
        },
        onSubmit: () => {}
    })


    const [issueProperties, setIssueProperties] = useState<any>()
    const navigator = useNavigate()
    if (!issueProperties)
        return <div>ERROR</div>

    const handleSubmit = async () => {
        const issueData = {title: formik.values.title, description: formik.values.description , modelId: formik.values.modelId }
        const database = await Database.get()
        await database.issues.insert(issueData)
        formik.resetForm()
    }
    const createForm = (issueProperties: string[]) => {
        if (issueProperties) {
            return issueProperties.map((item) => {
                if (!item.startsWith("_")) {
                    return (
                        <Grid item xs={4} md={4} key={item}>
                            <TextField
                                id={item}
                                name={item}
                                key={item}
                                label={item}
                                onChange={formik.handleChange}
                            >
                            </TextField>
                        </Grid>
                    )
                }
            })
        }
    }

    return (
        <Card>
            <Button onClick={() => {navigator("/list")}}>Navigate to list</Button>
            <Grid container spacing={2}>
                {createForm(Object.keys(issueProperties))}
                <Grid item xs={4} md={4}>
                    <Button type='submit' variant='contained' onClick={() => handleSubmit()}>Save issue</Button>
                </Grid>
            </Grid>
        </Card>
    )
};

export default IssuesForm;

import React, { useEffect } from 'react'
import * as Database from "../Database"
import { useParams } from "react-router-dom"

type Props = {}

const IssueDetail = (props: Props) => {
    const { id } = useParams()

    useEffect(() => {
        async function setData() {
            const database = await Database.get()
            const issue = await database.collections.issues.findOne(id).exec()
            console.log(issue)
        }
        setData()
    })
    

  return (<div>

  </div>)
};

export default IssueDetail;

import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate, RouteObject } from 'react-router'
import ListIssues from './Pages/ListIssues'
import IssuesForm from './Pages/IssuesForm'
import IssueDetail from './Pages/IssueDetail'

const routes: RouteObject[] = [
    {
      path: "/",
      element: <><Outlet/></>,
      children: 
      [
        {path: "/", element: <ListIssues/>, caseSensitive: false},
        {path: "list", element: <ListIssues/>, caseSensitive: false},
        {path: "insert", element: <IssuesForm/>, caseSensitive: false},
        {path: "issue/:id", element: <IssueDetail/>, caseSensitive: false}
      ],
      caseSensitive: false
    }
  ]
  
  export default routes
import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { Box, Columns, Tag } from "react-bulma-components";

const GRAPHURL = 'https://api.github.com/graphql'

export interface githubEdge {
  title: string,
  labels: Array<any>,
  url: string
}

async function getIssuesFromGithub(search: string | undefined): Promise<any> {
  let query = "query { repository(owner:\"facebook\", name:\"React\") { issues(last:10) { edges { node { title url labels(first:3) { edges { node { name } } } } } } } }"

  if (search) {
    query = `query { search(first:20, type:ISSUE, query: "${search} repo:facebook/react in:title") { edges { node { ... on Issue { title url labels(first:3) { edges { node { name } } } } } } } }`
  }
  
  const result = await axios.post(GRAPHURL, {
    "query": query
  }, { headers : {'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`} })

  return result.data
}


export default function ListIssues(props: any) {
  const { searchValue, doSearch, setDoSearch, issues, setIssues } = props
  
  const listItems = issues.map((elem: any, index: number) => {
    return (
      <Box key={elem.url}>
        <Columns>
          <Columns.Column size={9} >
            {elem.title}
          </Columns.Column>
          <Columns.Column>
            <Tag.Group>
              {elem.labels.map((elem:any, index:number) => { return <Tag color="info" key={`${index}-label`}>{elem}</Tag>})}
            </Tag.Group>
          </Columns.Column>
        </Columns>
      </Box>
    )
  })

  useEffect(() => {
    getIssuesFromGithub(searchValue).then((result) => {
      if (result.errors) {
        alert('There was an error fetching the information!\n' + result.errors[0].message)
        return
      }
      const data = searchValue? result.data.search.edges : result.data.repository.issues.edges

      setIssues(data.map((item: any): githubEdge => {
        return {
          title: item.node.title,
          labels: item.node.labels.edges.map((elem: any) => { return elem.node.name.split(':')[1] || '' }),
          url: item.node.url
        }
      }))

      if (doSearch) {
        setDoSearch(false)
      }
    }).catch((error) => {
      alert('There was an error fetching the information!\n' + error.toString())
    });
    // setIssues([
    //   {title: 'Uno', labels:['a:uno'], url:'unourl'},
    //   {title: 'Dos', labels:['a:dos'], url:'dosurl'},
    //   {title: 'Tres', labels:['a:tres'], url:'tresurl'},
    //   {title: 'Cuatro', labels:['a:cuatro'], url:'cuatrourl'},
    //   {title: 'Cinco', labels:['a:cinco'], url:'cincourl'},
    // ])
  }, [doSearch])

  return (
    <Fragment>
      { listItems }
    </Fragment>
  )
}
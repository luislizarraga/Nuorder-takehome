import './App.css';
import 'bulma/css/bulma.min.css';
import ListIssues, { githubEdge } from './components/ListIssues';
import SearchComponent from './components/SearchComponent';
import React, { useState } from 'react';
import { Container, Section, Heading } from 'react-bulma-components';

function App() {
  const [ searchValue, setSearchValue ] = useState<string>('');
  const [ doSearch, setDoSearch ] = useState<boolean>(false);
  const [issues, setIssues] = useState<Array<githubEdge> | Array<any>>([]);

  return (
    <Section alignContent='center' colorVariant='dark' alignItems='center'>
      <Container breakpoint='tablet'>
        <Heading textColor='white'>
          Searching in Facebook's React issues
        </Heading>
        <Section>
          <Container>
            <SearchComponent setSearchValue={setSearchValue} searchValue={searchValue} setDoSearch={setDoSearch} issues={issues} />
          </Container>
        </Section>
        <Section>
          <Container>
            <ListIssues searchValue={searchValue} setDoSearch={setDoSearch} doSearch={doSearch} issues={issues} setIssues={setIssues}/>
          </Container>
        </Section>
      </Container>
    </Section>
  );
}

export default App;

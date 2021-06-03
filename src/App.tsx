import './App.css';
import 'bulma/css/bulma.min.css';
import ListIssues from './components/ListIssues';
import SearchInput from './components/SearchInput';
import React, { useState } from 'react';
import { Container, Section, Heading } from 'react-bulma-components';

function App() {
  const [ searchValue, setSearchValue ] = useState<string>('');
  const [ doSearch, setDoSearch ] = useState<boolean>(false);

  return (
    <Section alignContent='center' colorVariant='dark' alignItems='center'>
      <Container breakpoint='tablet'>
        <Heading textColor='white'>
          Searching in Facebook's React issues
        </Heading>
        <Section>
          <Container>
            <SearchInput setSearchValue={setSearchValue} searchValue={searchValue} setDoSearch={setDoSearch} />
          </Container>
        </Section>
        <Section>
          <Container>
            <ListIssues searchValue={searchValue} setDoSearch={setDoSearch} doSearch={doSearch}/>
          </Container>
        </Section>
      </Container>
    </Section>
  );
}

export default App;

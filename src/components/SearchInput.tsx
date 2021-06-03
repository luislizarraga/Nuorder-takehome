import React from "react";
import { Button, Columns, Form } from "react-bulma-components";

export default function SearchInput (props: any) {
  
  const searchOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    props.setSearchValue(e.currentTarget.value);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.code === 'Enter') {
      props.setDoSearch(true);
    }

    return
  }

  return (
    <Columns>
      <Columns.Column>
        <Form.Field>
          <Form.Control>
            <Form.Input placeholder='Search React issues...' value={props.searchValue} onChange={searchOnChange} onKeyDown={onKeyDown}/>
          </Form.Control>
        </Form.Field>
      </Columns.Column>
      <Columns.Column>
        <Button onClick={() => { props.setDoSearch(true) }}>
          Search!
        </Button>
      </Columns.Column>
    </Columns>
  )
}
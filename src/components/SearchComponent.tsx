import React from "react";
import { Button, Columns } from "react-bulma-components";
import Autocomplete from "./Autocomplete";

export default function SearchComponent (props: any) {
  
  // const searchOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
  //   props.setSearchValue(e.currentTarget.value);
  // }

  // const onKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
  //   if (e.code === 'Enter') {
  //     props.setDoSearch(true);
  //   }

  //   return
  // }

  return (
    <Columns>
      <Columns.Column>
        <Autocomplete suggestions={props.issues} { ...props }/>
      </Columns.Column>
      <Columns.Column>
        <Button onClick={() => { props.setDoSearch(true) }}>
          Search!
        </Button>
      </Columns.Column>
    </Columns>
  )
}
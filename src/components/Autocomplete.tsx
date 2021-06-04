import React, { Fragment, useState } from "react"
import { Form } from "react-bulma-components";
import { githubEdge } from "./ListIssues";
import './Autocomplete.css';

interface IData {
  activeSuggestion: number,
  filteredSuggestions : Array<githubEdge>,
  showSuggestions: boolean,
  isActive: string
}

export default function Autocomplete(props: any | undefined) {
  const [autoState, setAutoState] = useState<IData>({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    isActive: ''
  });

  const searchOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { suggestions, setSearchValue } = props
    const userInput = e.currentTarget.value
    const filteredSuggestions = suggestions.filter(
      (suggestion: githubEdge): boolean =>
        suggestion.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
  
    setSearchValue(userInput);
    setAutoState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      isActive: 'is-active'
    });
  }

  const onClick = (e: React.MouseEvent<HTMLElement>): void => {
    const {setSearchValue} = props
    setSearchValue(e.currentTarget.innerText)
    setAutoState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      isActive: ''
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { setSearchValue } = props
    const { activeSuggestion, filteredSuggestions } = autoState;

    if (e.code === 'Enter') {
      setAutoState({ ...autoState,
        activeSuggestion: 0,
        showSuggestions: false,
        isActive: ''
      });
      setSearchValue(filteredSuggestions[activeSuggestion].title)
    } else if (e.code === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      }
      setAutoState({...autoState, activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.code === 'ArrowDown') {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setAutoState({...autoState, activeSuggestion: activeSuggestion + 1 });
    }
  };

  const getSuggestions = () => {
    let suggestionsListComponent
    const { searchValue } = props
    const { showSuggestions, filteredSuggestions, activeSuggestion } = autoState
    if (showSuggestions && searchValue) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className='dropdown-menu' id='dropdown-menu' role='menu'>
            <div className="dropdown-content">
              {filteredSuggestions.map((suggestion: githubEdge, index: number): any => {
                let className = 'dropdown-item';
      
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className += " is-active";
                }
                return (
                  <Fragment>
                    {index > 0 ? <hr className="dropdown-divider"></hr> : null}
                    <div className={className} key={suggestion.url} onClick={onClick}>
                      {suggestion.title}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions dropdown-item">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    return suggestionsListComponent
  }

  
  return (
    <Fragment>
      <div className={'dropdown ' + autoState.isActive}>
        <div className='dropdown-trigger'>
          <Form.Field>
            <Form.Control>
              <Form.Input placeholder='Search React issues...' value={props.searchValue} onChange={searchOnChange} onKeyDown={onKeyDown}/>
            </Form.Control>
          </Form.Field>
        </div>
      {getSuggestions()}
      </div>
    </Fragment>
  )
}
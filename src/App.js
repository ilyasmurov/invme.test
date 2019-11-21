import React from "react";
import OverviewList from "./OverviewList";
import PropTypes from "prop-types";

import './App.css';
import fakerData from "./lib/faker";

import Layout from './components/styled/Layout';
import { SearchPanel } from './components/styled/SearchPanel';
import { Header } from './components/styled/Header';
import { Input } from './components/styled/Controls';

// const list = Array(100000).fill().map(() => Math.round(Math.random() * 100000))

const list = fakerData(10000);

const getSearchValue = value => {
  const re = new RegExp(value, 'gi');
  const result = list.filter(x => x.name.match(re));
  return result;
}

class App extends React.PureComponent {
  static childContextTypes = {
    customElement: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      data: list,
      value: ''
    };
    this.interval = null;
  }

  getChildContext() {
    const { container } = this.state;
    return {
      customElement: container
    };
  }

  searchHandler = e => {
    const { value } = e.target;
    clearInterval(this.interval);
    this.interval = setTimeout(() => {
      this.searching(value);
    }, 3000)
    this.setState({ value })
  }

  keyDownHandler = e => {
    const { value } = this.state;
    if (e.key === 'Enter') {
      clearInterval(this.interval);
      this.searching(value);
    }
  }

  searching = value => {
    value = value.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ')
    const sortedList = getSearchValue(value);
    this.setState({
      data: value.length > 0 ? sortedList : list,
    })
  }

  render() {
    const { container, data } = this.state;
    return (
      <div
        id="scroll-wrapper"
        className="content-container"
        ref={e => this.setState({ container: e })}
      >
        <Layout>
          <Header>
            <h2>Friends list</h2>
          </Header>
          <SearchPanel>
            <Input 
              placeholder='search' 
              value={this.state.value} 
              onKeyDown={e => this.keyDownHandler(e)} 
              onChange={e => this.searchHandler(e)}
              autoFocus='true'
            />
          </SearchPanel>
          {container && (
            <OverviewList
              container={container}
              items={data}
            />
          )}
        </Layout>
      </div>
    );
  }
}

export default App;

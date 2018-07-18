/* eslint-disable */
import React, { Component } from 'react';
import { storiesOf, action } from '@storybook/react';
import Select from './index';

class Wrapper extends Component {
  state = {
    selectedItem: null,
    dirty: false,
  };

  handleOnChange = (selectedItem) => {
    this.setState({
      selectedItem,
      dirty: true,
    });
  };

  render() {
    return (
      <div>
        <Select
          id="customizedID"
          placeholder="What is your vehicle type?"
          name="vehicleType"
          itemList={[
            {
              id: 'MOTORCYCLE',
              value: 'Motorcycle',
            },
            {
              id: 'VAN',
              value: 'Van',
            },
          ]}
          selectedItem={this.state.selectedItem}
          onFocus={e => {
            console.log('focused');
          }}
          onChange={this.handleOnChange}
          dirty={this.state.dirty}
        />

        <br />
        <Select
          placeholder="What is your vehicle type?"
          name="vehicleType"
          itemList={[
            {
              id: 'MOTORCYCLE',
              value: 'Motorcycle',
            },
            {
              id: 'VAN',
              value: 'Van',
            },
          ]}
          selectedItem={this.state.selectedItem}
          onFocus={e => {
            console.log('focused');
          }}
          onChange={this.handleOnChange}
          error="Error Message"
          dirty={this.state.dirty}
        />
      </div>
    );
  }
}

storiesOf('Select', module).add('Basic', () => <Wrapper />);

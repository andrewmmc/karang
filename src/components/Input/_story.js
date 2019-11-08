/* eslint-disable max-classes-per-file */
import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import Input, { PinInput, SearchInput, EditableInput } from './index';
import BaseApp from '../BaseApp';

class InputWrapper extends Component {
  state = {
    username: '',
    usernameRtl: '',
    password: '',
    passwordRtl: '',
    address: 'Sample Address',
    addressRtl: 'Sample Address',
    companyName: '',
    industry: '',
  };

  input = React.createRef();

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <h4>Basic</h4>
        <Input
          ref={this.input}
          type="text"
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          autoFocus
        />
        <h4>Basic (right to left)</h4>
        <BaseApp rtl>
          <Input
            ref={this.input}
            type="text"
            label="Username"
            name="usernameRtl"
            value={this.state.usernameRtl}
            onChange={this.handleChange}
            autoFocus
            placeholder="gaurav"
          />
        </BaseApp>
        <h4>Password</h4>
        <Input
          type="password"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          masked
        />
        <BaseApp rtl>
          <h4>Password (right to left) </h4>
          <Input
            type="password"
            label="Password"
            name="passwordRtl"
            value={this.state.passwordRtl}
            onChange={this.handleChange}
            masked
            rtl
          />
        </BaseApp>
        <h4>Non-masked password</h4>
        <Input
          type="password"
          label="Non-masked Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          masked={false}
        />
        <h4>With error message</h4>
        <Input
          type="text"
          label="Address"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
          error="Error Message"
        />
        <h4>With error message (right to left) </h4>
        <BaseApp rtl>
          <Input
            type="text"
            label="Address"
            name="addressRtl"
            value={this.state.addressRtl}
            onChange={this.handleChange}
            error="Error Message"
            rtl
          />
        </BaseApp>
        <h4>Select all when clicked</h4>
        <Input
          type="text"
          label="Company Name"
          name="companyName"
          value={this.state.companyName}
          onChange={this.handleChange}
          selectAll
        />
        <h4>Move cursor to end of input</h4>
        <Input
          type="text"
          label="Industry"
          name="industry"
          value={this.state.industry}
          onChange={this.handleChange}
          cursorEnd
        />
        <h4>Uncontrolled component</h4>
        <Input
          type="text"
          label="Uncontrolled"
          name="uncontrolled"
          defaultValue=""
        />
      </Fragment>
    );
  }
}

class PinInputWrapper extends Component {
  state = {
    register: ['', '', '', ''],
    resetPassword: ['1', '3', '3', '4'],
  };

  render() {
    return (
      <Fragment>
        <h4>Basic</h4>
        <PinInput pins={this.state.register} />
        <h4>With error message</h4>
        <PinInput pins={this.state.resetPassword} error="Error Message" />
        <h4>With error message (right to left) </h4>
        <BaseApp rtl>
          <PinInput
            pins={this.state.resetPassword}
            error="Error Message (right to left)"
            rtl
          />
        </BaseApp>
        <h4>Small size</h4>
        <PinInput pins={this.state.resetPassword} size="small" />
      </Fragment>
    );
  }
}

const SearchInputWrapper = () => (
  <>
    <h4>Basic</h4>
    <SearchInput
      name="searchValue"
      placeholder="Search for Order ID, Driver's Mobile"
    />
    <h4>Basic (right to left)</h4>
    <BaseApp rtl>
      <SearchInput
        name="searchValue"
        placeholder="Search for Order ID, Driver's Mobile"
        rtl
      />
    </BaseApp>
  </>
);

class EditableInputWrapper extends Component {
  state = {
    isLoading: false,
    isSuccess: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (!prevState.isLoading && this.state.isLoading) {
      this.timeout = setTimeout(
        () => this.setState({ isLoading: false, isSuccess: true }),
        1000
      );
    }

    if (!prevState.isSuccess && this.state.isSuccess) {
      this.timeout = setTimeout(
        () => this.setState({ isSuccess: false }),
        3000
      );
    }
  }

  handleSave = () => {
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({ error: null });
  };

  handleChange = () => {
    this.setState({ error: null });
  };

  handleError = () => {
    this.setState({ error: 'Email is invalid' });
  };

  render() {
    const { isLoading, isSuccess, error } = this.state;
    const validate = value => {
      // e.g. validating email
      const regexp = new RegExp(/^[\w-+]+(\.[\w-+]+)*@[\w-]+(\.[\w-]+)+$/i); // email pattern
      return regexp.test(value);
    };
    return (
      <Fragment>
        <h4>Basic</h4>
        <EditableInput
          name="Billing Email"
          placeholder="Billing Email"
          defaultValue="no-reply@lalamove.com"
          onSave={this.handleSave}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <h4>Basic (right to left)</h4>
        <BaseApp rtl>
          <EditableInput
            name="Billing Email (right to left)"
            placeholder="Billing Email (right to left)"
            defaultValue="no-reply-rtl@lalamove.com"
            onSave={this.handleSave}
            isLoading={isLoading}
            isSuccess={isSuccess}
            rtl
          />
        </BaseApp>

        <h4>With validate function</h4>
        <EditableInput
          name="Billing Email"
          placeholder="Billing Email"
          defaultValue="no-reply@lalamove.com"
          onSave={this.handleSave}
          onError={this.handleError}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
          validate={validate}
          error={error}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Fragment>
    );
  }
}

storiesOf('Input', module)
  .add('Input', () => <InputWrapper />)
  .add('PinInput', () => <PinInputWrapper />)
  .add('SearchInput', () => <SearchInputWrapper />)
  .add('EditableInput', () => <EditableInputWrapper />);

/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import DropIcon from 'components/Icon/icons/arrows/dropdown';
import MenuIcon from 'components/Icon/icons/content/vmenu';
import PinFilledIcon from 'components/Icon/icons/maps/pinFilled';
import Dropdown from './index';
import BaseApp from '../BaseApp';

const items = [
  {
    value: 'hello',
    label: 'Hello world!',
  },
  {
    value: 'bye',
    label: 'Bye!',
  },
];

const itemsWithDisabled = [
  {
    value: 'hello',
    label: 'Hello world!',
    disabled: false,
  },
  {
    value: 'morning',
    label: 'Good morning, Dave.',
    disabled: true,
  },
  {
    value: 'bye',
    label: 'Bye!',
  },
];

const itemsWithSubmenu = [
  {
    value: 'TH',
    label: 'Thailand',
    icon: <PinFilledIcon />,
    options: [
      {
        value: 'TH_BKK',
        label: 'Bangkok',
        icon: <PinFilledIcon />,
      },
      {
        value: 'TH_CNX',
        label: 'Chiang Mai',
        icon: <PinFilledIcon />,
      },
    ],
  },
  {
    value: 'HK_HKG',
    label: 'Hong Kong',
    icon: <PinFilledIcon />,
  },
  {
    value: 'VN_HCM',
    label: 'Vietnam',
    icon: <PinFilledIcon />,
  },
  {
    value: 'PH',
    label: 'Philippines',
    icon: <PinFilledIcon />,
    options: [
      {
        value: 'PH_MNL',
        label: 'Manila',
        icon: <PinFilledIcon />,
      },
      {
        value: 'PH_CEB',
        label: 'Cebu',
        icon: <PinFilledIcon />,
      },
    ],
  },
  {
    value: 'SG_SGN',
    label: 'Singapore',
    icon: <PinFilledIcon />,
  },
  {
    value: 'TW_TPE',
    label: 'Taiwan',
    icon: <PinFilledIcon />,
  },
];

const Basic = () => (
  <div dir={boolean('Right-To-Left', false) ? 'rtl' : 'ltr'}>
    <BaseApp rtl={boolean('Right-To-Left', false)}>
      <h4>Basic</h4>
      <Dropdown items={items} />
      <h4>Basic disabled</h4>
      <Dropdown items={items} disabled />
      <h4>Basic with disabled item</h4>
      <Dropdown items={itemsWithDisabled} />
      <h4>Basic with custom button icon</h4>
      <Dropdown items={items} icon={<MenuIcon size={24} />} />
      <h4>Basic with item icon</h4>
      <Dropdown
        items={items.map(item => ({ ...item, icon: <PinFilledIcon /> }))}
      />
      <h4>Block</h4>
      <Dropdown items={items} block />
      <h4>Compact</h4>
      <Dropdown variant="compact" items={items} />
      <h4>Compact disabled</h4>
      <Dropdown variant="compact" items={items} disabled />
      <h4>Compact with custom button icon</h4>
      <Dropdown variant="compact" items={items} icon={<DropIcon size={36} />} />
    </BaseApp>
  </div>
);

class CascadingMenu extends Component {
  state = {
    dropdown1: itemsWithSubmenu[5],
    dropdown2: itemsWithSubmenu[1],
    dropdown3: itemsWithSubmenu[0],
  };

  handleChange = (name, item) => {
    this.setState({ [name]: item });
  };

  render() {
    const { dropdown1, dropdown2, dropdown3 } = this.state;

    return (
      <div dir={boolean('Right-To-Left', false) ? 'rtl' : 'ltr'}>
        <BaseApp rtl={boolean('Right-To-Left', false)}>
          <h4>Cascading menu with icon</h4>
          <Dropdown
            items={itemsWithSubmenu}
            onChange={item => this.handleChange('dropdown1', item)}
            selectedItem={dropdown1}
          />
          <h4 style={{ textAlign: 'right' }}>Cascading menu on right side</h4>
          <div style={{ float: 'right' }}>
            <Dropdown
              items={itemsWithSubmenu}
              onChange={item => this.handleChange('dropdown2', item)}
              selectedItem={dropdown2}
              direction="left"
            />
          </div>
          <h4 style={{ textAlign: 'center' }}>
            Cascading menu with direction right
          </h4>
          <div style={{ textAlign: 'center' }}>
            <Dropdown
              items={itemsWithSubmenu}
              onChange={item => this.handleChange('dropdown2', item)}
              selectedItem={dropdown2}
              direction="right"
            />
          </div>
          <h4 style={{ clear: 'both' }}>
            Cascading menu with <code>block</code> set to <code>true</code>
          </h4>
          <span style={{ color: 'white', background: '#fea000' }}>
            Container (shown with padding here):
          </span>
          <div
            style={{
              width: '50%',
              padding: '1em',
              border: '1px solid #fea000',
              background: '#fff8e1',
            }}
          >
            <Dropdown
              items={itemsWithSubmenu}
              onChange={item => this.handleChange('dropdown3', item)}
              selectedItem={dropdown3}
              block
            />
          </div>
        </BaseApp>
      </div>
    );
  }
}

storiesOf('Dropdown', module)
  .add('Basic', () => <Basic />)
  .add('Cascading menu', () => <CascadingMenu />);

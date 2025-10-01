import React from 'react';
import { PrettyButton } from './Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PrettyButton> = {
  title: 'Components/PrettyButton',
  component: PrettyButton,
};

export default meta;

export const Primary: StoryObj<typeof PrettyButton> = {
  render: () => <PrettyButton>Click Me</PrettyButton>,
};
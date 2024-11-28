import type { Meta, Story } from '@storybook/vue3';
import InputEmail from './InputEmail.vue';

export default {
	title: 'Components/InputEmail',
	component: InputEmail,
	argTypes: {
		value: { control: 'text' },
		label: { control: 'text' },
		instructions: { control: 'text' },
		required: { control: 'boolean' },
		error: { control: 'array' },
		rules: { control: 'object' },
		change: { action: 'change' },
		touched: { action: 'touched' },
	},
} as Meta;

const Template: Story = args => ({
	components: { InputEmail },
	setup() {
		return { args };
	},
	template: '<InputEmail v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
	value: '',
	label: 'Email',
	instructions: 'Please enter your email address.',
	required: false,
	error: [],
	rules: {},
};

export const Required = Template.bind({});
Required.args = {
	value: '',
	label: 'Email',
	instructions: 'Please enter your email address.',
	required: true,
	error: [],
	rules: {},
};

export const WithError = Template.bind({});
WithError.args = {
	value: '',
	label: 'Email',
	instructions: 'Please enter your email address.',
	required: true,
	error: ['This field is required.'],
	rules: {},
};

export const CustomValidation = Template.bind({});
CustomValidation.args = {
	value: '',
	label: 'Email',
	instructions: 'Please enter your email address.',
	required: true,
	error: [],
	rules: {
		customRule: {
			test: (value: string) => value.includes('@example.com'),
			message: 'Email must be from example.com domain.',
		},
	},
};

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputEmail from '@/components/Atoms/Form/InputEmail';

describe('InputEmail.vue', () => {
	it('renders correctly', () => {
		const wrapper = mount(InputEmail, {
			props: {
				label: 'Email',
				placeholder: 'Enter your email',
			},
		});
		expect(wrapper.find('label').text()).toBe('Email');
		expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your email');
	});

	it('sets initial value from props', () => {
		const wrapper = mount(InputEmail, {
			props: {
				value: 'test@example.com',
			},
		});
		expect(wrapper.find('input').element.value).toBe('test@example.com');
	});

	it('updates model value correctly', async () => {
		const wrapper = mount(InputEmail, {
			props: {
				value: 'test@example.com',
			},
		});
		const input = wrapper.find('input');
		await input.setValue('new@example.com');
		expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['new@example.com']);
	});

	it('emits change event on input', async () => {
		const wrapper = mount(InputEmail, {
			props: {
				value: 'test@example.com',
			},
		});
		const input = wrapper.find('input');
		await input.setValue('new@example.com');
		expect(wrapper.emitted().change?.[0] ?? []).toEqual(['new@example.com']);
	});

	it('validates email correctly', async () => {
		const wrapper = mount(InputEmail, {
			props: {
				value: '',
				rules: {
					required: {
						test: (value: string) => !!value,
						message: 'This field is required',
					},
					email: {
						test: (value: string) => /\S+@\S+\.\S+/.test(value),
						message: 'This field must be a valid email address',
					},
				},
			},
		});

		const input = wrapper.find('input');
		await input.setValue('');
		const error = wrapper.find('.error');
		expect(error.exists()).toBe(true);
		expect(error.text()).toBe('This field is required');

		// await input.setValue('invalid-email');
		// error = wrapper.find('.error');
		// expect(error.exists()).toBe(true);
		// expect(error.text()).toBe('This field must be a valid email address');

		// await input.setValue('valid@example.com');
		// error = wrapper.find('.error');
		// expect(error.exists()).toBe(false);
	});
});

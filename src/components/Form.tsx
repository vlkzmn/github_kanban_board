import { Button, Flex, Form, Input } from 'antd';

import { useAppDispatch } from '../app/hooks';
import { add } from '../features/repoNameSlice';
import { getRepoName, validateUrl } from '../utils/stringUtils';
import { useCallback } from 'react';

interface FormData {
  url: string;
}

export const FormComponent = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onSubmit = useCallback(
    (data: FormData) => {
      const repositoryName = getRepoName(data.url);
      dispatch(add(repositoryName));
      form.resetFields();
    },
    [dispatch, form],
  );

  return (
    <Form form={form} onFinish={onSubmit}>
      <Flex justify="space-between" gap={20}>
        <Form.Item
          name="url"
          style={{ flexGrow: 1, margin: 0 }}
          rules={[
            { required: true },
            { type: 'string' },
            { validator: validateUrl },
          ]}
        >
          <Input placeholder="Enter repo URL" data-testid="input" />
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button type="primary" htmlType="submit" data-testid="button">
            Load issues
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

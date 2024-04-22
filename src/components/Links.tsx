import { useEffect, useMemo } from 'react';
import { Flex, Typography, Skeleton, Alert } from 'antd';
import Link from 'antd/es/typography/Link';
import { StarFilled } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useGetRepoDataQuery } from '../features/repoDataApi';
import { addErrorLoading, selectRepoName } from '../features/repoNameSlice';

export const Links = () => {
  const repoName = useAppSelector(selectRepoName);
  const { data, isFetching, error } = useGetRepoDataQuery(repoName);
  const dispatch = useAppDispatch();
  const { Text } = Typography;
  const starsCount = useMemo(
    () =>
      data && data.stars > 999
        ? `${Math.floor(data.stars / 1000)} K stars`
        : `${data?.stars} stars`,
    [data],
  );

  useEffect(() => {
    dispatch(addErrorLoading(!!error));
  }, [error, dispatch]);

  return (
    <>
      {isFetching && (
        <div data-testid="links-skeleton">
          <Skeleton
            active
            paragraph={false}
            title={{ style: { width: '300px', marginTop: '5px' } }}
          />
        </div>
      )}

      {!isFetching && !error && data && (
        <Flex gap="middle">
          <Link
            href={data.owner_url}
            target="_blank"
            rel="noreferrer"
            data-testid="owner-link"
          >
            {data.owner}
          </Link>

          <Text style={{ color: '#1677ff' }}>&#62;</Text>

          <Link
            href={data.repo_url}
            target="_blank"
            rel="noreferrer"
            data-testid="repo-link"
          >
            {data.repo_name}
          </Link>

          {data.stars > 0 && (
            <Flex align="center">
              <StarFilled style={{ fontSize: '20px', color: '#ed8a19' }} />

              <Text strong data-testid="stars">
                {starsCount}
              </Text>
            </Flex>
          )}
        </Flex>
      )}

      {error && !isFetching && (
        <Alert
          message="Ooops!"
          description={`No such "${repoName}" repository exists on GitHub or error loading data.`}
          type="error"
          showIcon
        />
      )}
    </>
  );
};

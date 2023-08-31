import useAxiosApi from '../interceptor';
export function test(params) {
  return useAxiosApi(`url`, {
    method: 'POST',
    ...params
  });
}
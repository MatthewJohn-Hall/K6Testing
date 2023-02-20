import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function() {
  const res = http.get('https://test-api.k6.io/public/crocodiles/ ');
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
 }
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '60s',

    /*Stages: [
        { duration: '30s', target: 1 },
        { duration: '30s', target: 10 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 5000 },
        { duration: '1s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '15s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '60s', target: 10 },
    ],
    scenarios:{
        basic_scenario:{
            executor: 'shared-iterations',

            startTime:'10s',
            gracefulStop: '5s',

            vus: 10,
            iterations: 200,
            maxDuration: '30s',
        }

    }*/
};

const Base_URL = 'https://test-api.k6.io/public/crocodiles/';
const check200 = 'is status 200';

export default function() {

    const res = http.get(Base_URL);
        check(res, {check200: (r) => r.status === 200,});

    const res2 = http.get(Base_URL + (Math.floor(Math.random() * 9)) + '/');
        check(res2, {check200: (r) => r.status === 200,});

    const resBody = JSON.parse(res.body);

    const res3 = http.get(Base_URL + resBody[Math.floor(Math.random() * resBody.length)].id + '/');
        check(res3, {check200: (r) => r.status === 200,});

    const idNum = new Array();
    for (let i = 0; i < resBody.length; i++){
         idNum.push(resBody[i].id);
        }

    const res4 = http.get(Base_URL + idNum[Math.floor(Math.random() * idNum.length)] + '/');
        check(res4, {check200: (r) => r.status === 200,});
}

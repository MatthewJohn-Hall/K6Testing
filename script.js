import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    /*vus: 1,
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
    ],*/
    scenarios:{
        /*public:{
            executor: 'shared-iterations',
            exec: 'Public',
            startTime:'10s',
            gracefulStop: '5s',

            vus:0,
            iterations: 10,
            maxDuration: '5s',
        },*/
        private:{
            executor: 'shared-iterations',
            exec: 'Private',
            startTime:'10s',
            gracefulStop: '5s',

            vus: 1,
            iterations: 10,
            maxDuration: '5s',
                }

    }
};

const Base_URL = 'https://test-api.k6.io/public/crocodiles/';
const Base_URLReg = 'https://test-api.k6.io/';
const check200 = 'is status 200';

export  function Public() {

    const res = http.get(Base_URL);
        check(res, {check200: (r) => r.status === 200,});

    const res2 = http.get(Base_URL + (Math.floor(Math.random() * 8) + 1) + '/');
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

export function Private() {

    const EmailRandomiser = Math.floor(Math.random() * 99999999) + 1;

    let data = {  username: "UserName"+EmailRandomiser,
                     first_name: "FirstName",
                     last_name: "LastName",
                     email: "user"+EmailRandomiser+'@somewhere.com',
                     password: "12345" };

    let res = http.post(Base_URLReg + "user/register/", JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("user register code:" + res.status);
      console.log("user body:" + res.body);
      check(res, {check200: (r) => r.status === 201,});

    let data2 = {
                    username: "UserName"+EmailRandomiser,
                    password: "12345"
                };

    let res2 = http.post(Base_URLReg + "auth/token/login/", JSON.stringify(data2), {
        headers: { 'Content-Type': 'application/json' },
        });
        console.log("user register code:" + res2.status);
        console.log("user body:" + res2.body);
        check(res2, {check200: (r) => r.status === 200,});


}






import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '60s',
};



export default function() {


    const res = http.get('https://test-api.k6.io/public/crocodiles/');
        check(res, {
        'is status 200': (r) => r.status === 200,
        });

    const resBody = JSON.parse(res.body);
    const idNum = new Array();

    for (let i = 0; i < resBody.length; i++){
     idNum.push(resBody[i].id);
    }

    const res2 = http.get('https://test-api.k6.io/public/crocodiles/'+ resBody[Math.floor(Math.random() * resBody.length)].id + '/');
            check(res2, {
                'is status 200': (r) => r.status === 200,
            });

    const res3 = http.get('https://test-api.k6.io/public/crocodiles/'+ idNum[Math.floor(Math.random() * idNum.length)] + '/');
                check(res3, {
                    'is status 200': (r) => r.status === 200,
                });

    const res4 = http.get('https://test-api.k6.io/public/crocodiles/'+ (Math.floor(Math.random() * 9)) + '/');
        check(res4, {
            'is status 200': (r) => r.status === 200,
        });

}
//1500 checks run on 10vu's in 15s
//5000 checks run on 1000ve's in 1min.
//Hit a ceiling of some sort evidently. Limited by the local machine or something else?
//4300 checks for 100vu's in 1min
//6000 checks for 10vu's in 1min
//consistent 97% failure rate.
//req_blocked, req connecting, req duration, req_tls_handshaking, waiting and iteration duration show the greatest change. Exponential?
//failed is consistent at 2.5-3%. Receiving also shows little change
//Sending does show a change but the difference is relatively minor even if it is increasing.
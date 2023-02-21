import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';





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

    const res4 = http.get('https://test-api.k6.io/public/crocodiles/'+ (Math.floor(Math.random() * 9)+1) + '/');
        check(res4, {
            'is status 200': (r) => r.status === 200,
        });

        console.log(idNum);

}
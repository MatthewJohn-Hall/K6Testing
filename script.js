import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';





export default function() {


    const res = http.get('https://test-api.k6.io/public/crocodiles/');
        check(res, {
        'is status 200': (r) => r.status === 200,
        });

    const obj = JSON.parse(res.body);


    const res2 = http.get('https://test-api.k6.io/public/crocodiles/'+ obj[Math.floor(Math.random() * obj.length)].id + '/');
            check(res2, {
                'is status 200': (r) => r.status === 200,
            });


    const res3 = http.get('https://test-api.k6.io/public/crocodiles/'+ (Math.floor(Math.random() * 9)+1) + '/');
        check(res2, {
            'is status 200': (r) => r.status === 200,
        });



    console.log(obj[Math.floor(Math.random() * obj.length)].id);

    console.log(obj.length)





 }
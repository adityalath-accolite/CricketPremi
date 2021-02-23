api1 = function (email,func) {
    setTimeout(() => {
        console.log(email);
        func(email.replace('@gmail.com', ''));
    }, 1000)
}
api2 = function (name,func) {
    setTimeout(() => {
        const a = 25
        console.log('the name from 1st api was', name)
        console.log(a);
        func(a);
    }, 1000)
}
api3 = function (num,func) {
    setTimeout(() => {
        console.log('the number from 2nd api was', num)
        func(['a', 'b', 'c']);
    }, 1000)
}

let a = api1('lath2411@gmail.com', (name) => {
    api2(name, (num) => {
        api3(num, (arr) => {
            const a = 2;
            console.log(arr[a]);
        })
    })
})




api4 = function(email){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(email.replace('@gmail.com', ''));
        },1000)
    })
}
api5 = function (name) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const a = 25
            console.log('the name from 1st api was', name)
            console.log(a);
            resolve(a);
        },1000)
    })
}
api6 = function (num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('the number from 2nd api was', num)
            resolve(['a', 'b', 'c']);
        },1000)
    })
}

async function aware(){
    const a = await api4('lath2411@gmail.com')
    console.log(await a);

    const b = await api5(a)
    const c = await api6(b)
    console.log(await c[1]);
}
aware()
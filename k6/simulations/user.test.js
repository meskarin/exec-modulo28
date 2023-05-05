import http from 'k6/http';
import {group, sleep } from 'k6';
import Login from '../request/login.request';
import User from '../request/user.request'
import Product from '../request/product.request';
import Customers from '../request/customers.request';
import data from '../data/usuario.json'

export const options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '5s', target: 50},
        {duration: '10s', target: 10},
        {duration: '5s', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
}

export default function () {
    let login = new Login()
    let user = new User()
    let product = new Product()
    let customers = new Customers()

    group('login and get token', () =>{
        login.access(data.usuarioOK.user, data.usuarioOK.pass)    
    })
    group('list users', () => {
        user.list(login.getToken())
    })
    group('list Products', () => {
        product.listProduct(login.getToken())
    })
    group('list Customers', () => {
        customers.listCustomers(login.getToken())
    })
}

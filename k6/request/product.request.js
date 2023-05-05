import {check} from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Product{
    listProduct(token){
        let response = http.get(`${Utils.getBaseUrl()}/products`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'listagem deve retorna 200': r => r && r.status === 200})
    }
}
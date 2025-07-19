import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(@Inject(HttpClient) private httpClient: HttpClient) { 
    
  }

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : environment.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<T>(): Observable<any> {
    let url: string = environment.baseUrl;

    return this.httpClient!.get(url);
  }

  get2<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient!.get<T>(url, { headers: requestParameter.headers, responseType: requestParameter.responseType as 'json' });
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
    return this.httpClient!.post<T>(url, body, { headers: requestParameter.headers, responseType: requestParameter.responseType as 'json' });
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient!.put<T>(url, body, { headers: requestParameter.headers, responseType: requestParameter.responseType as 'json' });
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient!.delete<T>(url, { headers: requestParameter.headers, responseType: requestParameter.responseType as 'json' });
  }
  inActive<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
  
    const headers = requestParameter.headers ?? new HttpHeaders();
    const updatedHeaders = headers.has('Content-Type') ? headers : headers.set('Content-Type', 'application/json');
    return this.httpClient!.put<T>(url, body, {
      headers: updatedHeaders,
      responseType: requestParameter.responseType as 'json'
    });
  }
  
  // inActive<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
  //   let url: string = "";
  //   if (requestParameter.fullEndPoint)
  //     url = requestParameter.fullEndPoint;
  //   else
  //     url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

  //   return this.httpClient!.put<T>(url, body, { headers: requestParameter.headers, responseType: requestParameter.responseType as 'json' });
  // }
}


export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;

  responseType?: string = 'json';
}
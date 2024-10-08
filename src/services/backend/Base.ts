// services/BaseService.ts
import { SessionService } from "@/utils/session";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base URL aus der .env Datei laden
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class ResponseHandler<T> {
  private successCallback: (data: T) => void = () => {};
  private errorCallback: (error: any, statuscode: number) => void = () => {};

  constructor(
    promiseFactory: () => Promise<AxiosResponse<T>>,
    baseService: BaseService
  ) {
    // Verzögere die Ausführung, um den Aufrufer Zeit zu geben, die Callbacks zu setzen
    setTimeout(() => {
      promiseFactory()
        .then((response) => {
          baseService.saveJwtIfPresent(response.data);
          this.successCallback(response.data);
        })
        .catch((error) => {
          
          // statuscode
          let statuscode = 0
          if(error["response"] && error["response"]["status"])
            statuscode = error["response"]["status"]

          this.errorCallback(error, statuscode);
        });
    }, 0);
  }

  public onSuccess(callback: (data: T) => void): ResponseHandler<T> {
    this.successCallback = callback;
    return this;
  }

  public onError(callback: (error: any, statuscode: number) => void): ResponseHandler<T> {
    this.errorCallback = callback;
    return this;
  }
}

export class BaseService {
  protected baseUrl: string;
  protected routePrefix: string;

  constructor(routePrefix: string, baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
    this.routePrefix = routePrefix;
  }

  // Middleware, die den JWT und Admin-Token hinzufügt
  protected async addAuthorizationHeaders(config: AxiosRequestConfig) {
    config.headers = config.headers || {};
    const jwt = SessionService.getItem("jwt");
    const admintoken = SessionService.getItem("admintoken");

    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }

    if (admintoken) {
      config.headers["admintoken"] = admintoken;
    }

    return config;
  }

  // JWT speichern, falls im Response-Body vorhanden
  public saveJwtIfPresent(responseData: any) {
    if (responseData && responseData.jwt) {
      SessionService.setItem("jwt", responseData.jwt);
      console.log("JWT token saved to SessionService");
    }
  }

  // Methode, um einen Request durchzuführen und einen ResponseHandler zurückzugeben
  protected request<T>(
    method: "get" | "post" | "put" | "patch" | "delete",
    endpoint: string,
    data?: any,
    customConfig?: AxiosRequestConfig
  ): ResponseHandler<T> {
    const promiseFactory = async () => {
      const config: AxiosRequestConfig = customConfig || {};
      await this.addAuthorizationHeaders(config);

      return axios({
        method,
        url: `${this.baseUrl}${this.routePrefix}${endpoint}`,
        data,
        ...config,
      });
    };

    return new ResponseHandler<T>(promiseFactory, this);
  }

  // HTTP-Methoden
  protected post<T>(
    endpoint: string,
    data?: any,
    customConfig?: AxiosRequestConfig
  ): ResponseHandler<T> {
    return this.request<T>("post", endpoint, data, customConfig);
  }

  protected get<T>(
    endpoint: string,
    customConfig?: AxiosRequestConfig
  ): ResponseHandler<T> {
    return this.request<T>("get", endpoint, undefined, customConfig);
  }

  protected put<T>(
    endpoint: string,
    data?: any,
    customConfig?: AxiosRequestConfig
  ): ResponseHandler<T> {
    return this.request<T>("put", endpoint, data, customConfig);
  }

  protected delete<T>(
    endpoint: string,
    customConfig?: AxiosRequestConfig
  ): ResponseHandler<T> {
    return this.request<T>("delete", endpoint, undefined, customConfig);
  }

  protected patch<T>(
    endpoint: string,
    data?: any,
    customConfig?: AxiosRequestConfig
  ): ResponseHandler<T> {
    return this.request<T>("patch", endpoint, data, customConfig);
  }
}
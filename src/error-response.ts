import axios, { AxiosError, AxiosInstance } from 'axios';




export default abstract class ErrorResponse {

    public static handle(theError: AxiosError): void {
        const errorResponse = ErrorResponse.createErrorResponse(theError);
        ErrorResponse.showUsingToasr(errorResponse);
    }
    private static showError(message: string) {
        // Snackbar.show({
        //     text: message,
        //     pos: 'bottom-center',
        //     backgroundColor: '#ff5252',
        //     actionTextColor: '#ffffff'
        //   });
    }
    private static showUsingToasr(errorResponse: ErrorResponse): void {
       if (errorResponse instanceof ClientErrors) {
            const clientErrors = errorResponse as ClientErrors;
            ErrorResponse.showError(clientErrors.list.map(x => x.message).join('\n'));
        } else if (errorResponse instanceof ClientExceptions) {
            const clientExceptions = errorResponse as ClientExceptions;
            ErrorResponse.showError('Error : ' + clientExceptions.list.map(x => x.message).join('\n'));
        } else if (errorResponse instanceof Forbidden) {
            ErrorResponse.showError('Forbidden : You are not authorized');
        } else if (errorResponse instanceof Unauthorized) {
            ErrorResponse.showError('Unauthorized : You are not authorized');
        } else  if (errorResponse instanceof ServerError) {
            if (process.env.NODE_ENV !== 'production') {
                ErrorResponse.showError('ServerError : Look at the server log ...');
            }
        } else if (errorResponse instanceof ServerTimeout) {
            ErrorResponse.showError('ServerTimeout : Server is not responding...');
        } else if (errorResponse instanceof OtherResponse) {
          // not handling
        }

    }

    private static createErrorResponse(theError: AxiosError): ErrorResponse {
        const response = theError.response!;
        switch (response.status) {
            case 400: return ClientExceptions.fromJsonString(JSON.stringify(response.data));
            case 412: return ClientErrors.fromJsonString(JSON.stringify(response.data));
            case 401: return new Unauthorized(response.data as any);
            case 403: return new Forbidden(response.data as any);
            case 500: return new ServerError(response.data as any);
            case 502: return new ServerTimeout(response.data as any);  // + makes a string to a number
            default:  return new OtherResponse(response.data as any, response.status);
        }
    }
    constructor(public statusCode: number) { }
}

class Unauthorized extends ErrorResponse {
    constructor(public reason: string) {super(401); }
}
class Forbidden extends ErrorResponse {
    constructor(public reason: string) {super(403); }
}
class ServerError extends ErrorResponse {
    constructor(public reason: string) {super(500); }
}
class ServerTimeout extends ErrorResponse {
    constructor(public ms: number) {super(502); }
}

class OtherResponse extends ErrorResponse {
    constructor(public reason: string, public status: number) {super(status); }
}
class ClientError {

    public static fromJsonString(jsonString: string): ClientError {
       const jsonObj: object = JSON.parse(jsonString);
       return ClientError.fromJson(jsonObj);
    }
    public static fromJson(o: object): ClientError {
        const json: any = o ;
        return new ClientError(
         (json.require != null) ? json.require : '',
         (json.message != null) ? json.message : ''
        );
    }

    constructor(
        public require: string = '',
        public message: string = ''
    ) {}



}
class ClientErrors extends ErrorResponse {

    public static fromJsonString(jsonString: string): ClientErrors {
        const addListToJsonString = '{ "list" :' + jsonString + '}';
        const jsonObj: object = JSON.parse(addListToJsonString);
        return ClientErrors.fromJson(jsonObj);
    }

    public static fromJson(o: object): ClientErrors {
        const json: any = o ;
        return new ClientErrors(
         (json.list != null) ? (json.list as object[]).map((x) => ClientError.fromJson(x)) : []
        );
    }

    constructor(
        public list: ClientError[] = []
    ) { super(412); }

}
class ClientException {

    public static fromJsonString(jsonString: string): ClientException {
       const jsonObj: object = JSON.parse(jsonString);
       return ClientException.fromJson(jsonObj);
    }
    public static fromJson(o: object): ClientException {
        const json: any = o ;
        return new ClientException(
         (json.field != null) ? json.field : '',
         (json.message != null) ? json.message : ''
        );
    }

    constructor(
        public field: string = '',
        public message: string = ''
    ) {}


}
class ClientExceptions extends ErrorResponse {

    public static fromJsonString(jsonString: string): ClientExceptions {
       const addListToJsonString = '{ "list" :' + jsonString + '}';
       const jsonObj: object = JSON.parse(addListToJsonString);
       return ClientExceptions.fromJson(jsonObj);
    }

    public static fromJson(o: object): ClientExceptions {
        const json: any = o ;
        return new ClientExceptions(
         (json.list != null) ? (json.list as object[]).map((x) => ClientException.fromJson(x)) : []
        );
    }

    constructor(
        public list: ClientException[] = []
    ) { super(400); }

}

interface Controller {
    handle: (request: import("express").Request, response: import("express").Response, next?: import("express").NextFunction) => void;
}

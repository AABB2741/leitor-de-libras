// TODO: Terminar tipo para requisições
import { AxiosResponse } from "axios";

export default interface ApiResponse<T> extends AxiosResponse<T | object> {
    data: T | { status: "error", message: string };
}

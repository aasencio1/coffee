import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator(
    (defaultValue: string, ctx: ExecutionContext) => {
        // replace data: unknown with defaultValue:string     //lo q páse como parametro desde llamada del decorador en el Controller., se imprime en la ejecucion de este metodo
        console.log({ defaultValue })
        const request= ctx.switchToHttp().getRequest();
        return request.protocol;
    }
)
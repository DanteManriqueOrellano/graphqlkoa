import { Args, Mutation, Query, Resolver } from "type-graphql";

import { getRepository } from "fireorm";
import { Service } from "typedi";
import { EInsumo } from "../entity/insumo";

//import { isAuth } from "../../middleware/isAuth";


@Service({ global: true })
@Resolver()
export class Insumo {

    //@UseMiddleware(isAuth)
    @Mutation(() => EInsumo)
    async nuevoInsumo(

        @Args() insumo: EInsumo,

    ): Promise<EInsumo> {
        
        const insumoRepository = getRepository(EInsumo);
        const newInsumo = await insumoRepository.create(
            {
                insumo: insumo.insumo,
                precio: insumo.precio,
                umedida: insumo.umedida
            }
        );
        return newInsumo
    }

    @Query(()=>[EInsumo])
    async listaTodosInsumos():Promise<EInsumo[]>
    {
        const insumoRepository = getRepository(EInsumo);
        let insumos = await insumoRepository.find();
        return insumos
    }
}

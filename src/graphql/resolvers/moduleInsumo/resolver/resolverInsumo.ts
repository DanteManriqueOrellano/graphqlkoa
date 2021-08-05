import { Args, Mutation, Query, Resolver,Arg } from "type-graphql";

import { getRepository } from "fireorm";
import { Service } from "typedi";
import { EInsumo } from "../entity/insumo";

//import { isAuth } from "../../middleware/isAuth";


@Service({ global: true })
@Resolver()
export class Insumo {
    insumoRepository = getRepository(EInsumo);

    //@UseMiddleware(isAuth)
    @Mutation(() => EInsumo)
    async nuevoInsumo(

        @Args() insumo: EInsumo,

    ): Promise<EInsumo> {
        
        
        const newInsumo = await this.insumoRepository.create(
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
        
        let insumos = await this.insumoRepository.find();
        return insumos
    }

    @Mutation(()=>String)
    async eliminarInsumoById(
        @Arg("id") id:string
        ):Promise<string>{

              this.insumoRepository.delete(id);
              return "insumo Eliminado"


    } 
}

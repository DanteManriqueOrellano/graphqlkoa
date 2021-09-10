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
    @Mutation(()=>String)
    async actualizarInsumoById(
        @Args() insumo: EInsumo
    ):Promise<string>{
        const uninsumo = await this.insumoRepository.findById(insumo.id);
        uninsumo.insumo = insumo.insumo;
        uninsumo.precio = insumo.precio;
        uninsumo.umedida = insumo.umedida;

        await this.insumoRepository.update(uninsumo);

        return "Insumo Actualizado"
    }
}

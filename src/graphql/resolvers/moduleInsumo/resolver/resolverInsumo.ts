import { Args, Mutation, Resolver } from "type-graphql";
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
        //const hashedPassword = await bcrypt.hash(user.password, 12);

        const userRepository = getRepository(EInsumo);
        const newInsumo = await userRepository.create({
            insumo: insumo.insumo,
            precio: insumo.precio,
            umedida: insumo.umedida,
        });
        return newInsumo
    }
}

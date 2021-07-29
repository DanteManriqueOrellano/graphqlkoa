import { ClassType, NonEmptyArray } from "type-graphql";
import { Service } from "typedi";
import { Insumo } from "./moduleInsumo/resolver/resolverInsumo";
import { TicTacToe } from "./moduleTic/resolvers/tic";
import { RegisterUserResolver } from "./moduleUsuario/resolver/resolverUsuario";


export const clasesResolver: NonEmptyArray<ClassType> = [
    TicTacToe,
    RegisterUserResolver,
    Insumo,
]

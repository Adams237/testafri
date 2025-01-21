import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Devis{
    @Prop({required:true,unique:true})
    num_devis:number;

    @Prop({required:true})
    name:string

    @Prop({required:true})
    prestation:string

    @Prop({required:true})
    date_debut:Date;

    @Prop({required:true})
    duree:number;

    @Prop({required:true})
    lieux:string

    @Prop({required:true})
    descriptions:Array<object>[]

    @Prop({required:true})
    prix:number

    @Prop({required:true})
    paiment:string;

    @Prop({required:true})
    condition:string
}

export const deviSchema = SchemaFactory.createForClass(Devis)
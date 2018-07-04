/**
 * Created by Admin on 13.04.2018.
 */
export class User{
  constructor(
    public email:string,
    public password:string,
    public name:string,
    public status:string,
    public id?:number
  ){

  }
}

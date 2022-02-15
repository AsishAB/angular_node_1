export class ResponseFromServer {
  response !: any;
  message !: any;
  token? : string; //? = > Optional variable
  expiresIn ?: any;
  userId?: any;
}

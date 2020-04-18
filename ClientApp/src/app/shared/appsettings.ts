export class Appsettings {

  private _baseUrl: string = "";

  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(value: string) {
    this._baseUrl = value;
  }
}

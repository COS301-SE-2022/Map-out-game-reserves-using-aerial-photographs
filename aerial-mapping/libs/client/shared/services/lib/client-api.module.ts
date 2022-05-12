import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ClientApiService } from "./client-api.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClient, ClientApiService],
  // exports: [ClientApiService],
})
export class ClientApiServiceModule {}

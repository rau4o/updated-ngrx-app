import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app/app.routes";
import {provideState, provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {importProvidersFrom, isDevMode} from "@angular/core";
import {authFeatureKey, authReducer} from "./app/auth/store/reducers";
import {HttpClientModule} from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    })
  ]
});

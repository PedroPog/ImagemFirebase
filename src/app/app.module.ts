import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';

import{AngularFireModule} from '@angular/fire/compat';
import{AngularFireStorageModule} from '@angular/fire/compat/storage';
import { LojaComponent } from './components/loja/loja.component';
import { TesteComponent } from './components/teste/teste.component';
import { RealComponent } from './components/real/real.component';

@NgModule({
  declarations: [
    AppComponent,
    LojaComponent,
    TesteComponent,
    RealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

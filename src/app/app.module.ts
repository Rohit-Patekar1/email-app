import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './pages/table/table.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from 'src/service/snackbar.service';
import { ViewTemplateComponent } from './pages/view-template/view-template.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupPageComponent,
    TableComponent,
    SnackbarComponent,
    ViewTemplateComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

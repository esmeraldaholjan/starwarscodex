import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import engLocale from '../assets/localization/en-locale.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StarWarsCodex';

  constructor(protected translate: TranslateService) {
    this.translate.setTranslation('en', engLocale);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}

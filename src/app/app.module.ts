import { NgModule, ErrorHandler, Pipe, PipeTransform } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LazyLoadImageModule } from 'ng2-lazyload-image';

// Importing all our pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { TabLoginPage } from '../pages/tab-login/tab-login';
import { TabSignupPage } from '../pages/tab-signup/tab-signup';
import { TabForgotPage} from '../pages/tab-forgot/tab-forgot';
import { HomePage } from '../pages/home/home';
import { PostDetailPage } from '../pages/post-detail/post-detail';
import { PageDetailPage } from '../pages/page-detail/page-detail';
import { SearchPage } from '../pages/search/search';
import { CategoryPage } from '../pages/category/category';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

// Custom Components

import { ErrorDialogComponent } from '../custom-components/errorDialog/errorDialog.component';
import { MiniPostComponent } from '../custom-components/mini-posts/mini-post.component';
import { SideMenuComponent } from '../custom-components/sidemenu/sidemenu.component';
import { BookmarkComponent } from '../custom-components/bookmark/bookmark';

// A Custom Pipe (Changes Cateogry IDs in wp-api to their respective text)
import { WpCategoryPipe } from '../providers/json-api-call/wp-categories.pipe';
import { WpCategoryAndPages } from '../providers/json-api-call/wp-categories-and-pages';


// Custom Providers
import { JsonApiCall } from '../providers/json-api-call/json-api-call';
import { IonicAuthHelper } from '../providers/ionic-auth/ionic-auth-helper';
import { IonicAuthBookmarks } from '../providers/ionic-auth/ionic-auth-bookmarks';

import { ImagePreloader } from '../custom-components/image-preloader/image-preloader';

// Import and set constant for Ionic Cloud Services
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

// Cloud Settings. You can get your App ID from apps.ionic.io
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '' // <--- your app id from apps.ionic.io goes here
  }
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabSignupPage,
    TabLoginPage,
    TabForgotPage,
    HomePage,
    PostDetailPage,
    PageDetailPage,
    SearchPage,
    CategoryPage,
    BookmarksPage,
    ResetPasswordPage,
    ErrorDialogComponent,
    MiniPostComponent,
    SideMenuComponent,
    BookmarkComponent,
    ImagePreloader,
    WpCategoryPipe,
    SafePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsPlacement: 'top',
      //apiUrl : 'https://audacitus.com/site/wp-json/wp/v2'  // NO TRAILING SLASHES!!
      apiUrl : 'https://www.bobhata.com'  // NO TRAILING SLASHES!!
      //apiUrl : 'http://localhost:8100'  // NO TRAILING SLASHES!!
    }),
    CloudModule.forRoot(cloudSettings),
    LazyLoadImageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabSignupPage,
    TabLoginPage,
    TabForgotPage,
    HomePage,
    PostDetailPage,
    PageDetailPage,
    SearchPage,
    CategoryPage,
    BookmarksPage,
    ResetPasswordPage,
    ErrorDialogComponent,
    MiniPostComponent,
    SideMenuComponent,
    BookmarkComponent
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler},
    JsonApiCall,
    IonicAuthHelper,
    IonicAuthBookmarks,
    WpCategoryAndPages]
})
export class AppModule {}

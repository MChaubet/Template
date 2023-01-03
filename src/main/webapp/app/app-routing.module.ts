import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './components/layouts/error/error.route';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import(`app/components/pages/pages.module`).then(m => m.PagesModule),
      },
      ...errorRoute,
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

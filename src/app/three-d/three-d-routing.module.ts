import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicSceneComponent } from './basic-scene/basic-scene.component';

const routes: Routes = [
  {
    path: 'basic-scene',
    component: BasicSceneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeDRoutingModule {}

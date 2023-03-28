import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeDRoutingModule } from './three-d-routing.module';
import { BasicSceneComponent } from './basic-scene/basic-scene.component';

@NgModule({
  declarations: [BasicSceneComponent],
  imports: [CommonModule, ThreeDRoutingModule],
})
export class ThreeDModule {}

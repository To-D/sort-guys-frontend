import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModelService } from '../model.service';
import { SyncPositionService } from '../sync-position.service';

@Component({
  selector: 'app-basic-scene',
  templateUrl: './basic-scene.component.html',
  styleUrls: ['./basic-scene.component.css'],
})
export class BasicSceneComponent implements OnInit {
  @ViewChild('canvasFrame', { static: true })
  canvasContainer!: ElementRef;

  constructor(
    private modService: ModelService,
    private syncService: SyncPositionService,
  ) {}

  ngOnInit() {
    this.syncService.initWebsocket();
    this.modService.init3D(this.canvasContainer.nativeElement);
  }
}

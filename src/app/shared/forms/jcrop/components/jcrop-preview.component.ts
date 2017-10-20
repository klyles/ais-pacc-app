import { Component, OnInit, OnDestroy, ContentChild, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'jcrop-preview',
  template: `
    <div class="jcrop-preview-container" [class.active]="active" [ngStyle]="{
        width: size,
        height: size
    }">
      <div class="jcrop-preview" [ngStyle]="setContainerStyles()" *ngIf="active">
        <img [ngStyle]="setImgStyles()" [src]="previewSrc">
      </div>
    </div>
  `,
  styles: [`
  .jcrop-preview-container{
      position: relative;
  }
  .jcrop-preview-container.active{
      box-shadow: 0 0 1px rgba(111,111,111, .7);
  }
  .jcrop-preview{
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      overflow: hidden;
  }
  .jcrop-preview img{
      position: absolute;
  }
`]
})
export class JcropPreviewComponent implements OnInit, OnDestroy {

  @Input() storeId: string;

  public active = false;

  private optionsSub: any;
  private cropSub: any;

  public previewSrc;

  public crop;
  public options;
  public size;

  constructor(private ngRedux: NgRedux<any>) {
  }

  ngOnInit() {

    const self = this;

    this.optionsSub = this.ngRedux
      .select([this.storeId, 'options'])
      .subscribe((options: any) => {
        if (options) {
          self.active = !!options.showThumbnail;
          self.previewSrc = options.src;
          self.options = options;
          self.size = options.thumbnailSize + 'px';
        }
      });


    this.cropSub = this.ngRedux.select([this.storeId, 'crop', 'change'])
      .subscribe((crop: any) => {
        if (crop && self.active) {
          self.crop = crop
        }
      });
  }


  ngOnDestroy() {
    this.optionsSub.unsubscribe();
    this.cropSub.unsubscribe();
  }

  setContainerStyles(): any {

    const options = this.options;
    const crop = this.crop;
    if (crop && crop.w > 0) {
      const size = options.thumbnailSize;

      const width = crop.h <= crop.w ? size : crop.w / crop.h * size;
      const height = crop.h > crop.w ? size : crop.h / crop.w * size;

      return {
        width: Math.round(width) + 'px',
        height: Math.round(height) + 'px'
      }
    } else {
      return {}
    }
  }

  setImgStyles(): any {
    const crop = this.crop;
    const options = this.options;

    if (crop && crop.w > 0) {
      const rx = options.width / crop.w;
      const ry = options.height / crop.h;

      const size = options.thumbnailSize;

      const width = crop.h <= crop.w ? size : crop.w / crop.h * size;
      const height = crop.h > crop.w ? size : crop.h / crop.w * size;

      return {
        width: Math.round(rx * width) + 'px',
        height: Math.round(ry * height) + 'px',
        marginLeft: '-' + Math.round(width / crop.w * crop.x) + 'px',
        marginTop: '-' + Math.round(height / crop.h * crop.y) + 'px'
      }
    } else {
      return {}
    }
  }
}

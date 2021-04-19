import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) { 
      this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  enableFawhnification(){
    this.renderer.addClass(this.document.body, 'fawhny-theme');

  }

  enableLight() {
    this.renderer.removeClass(this.document.body, 'fawhny-theme');
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, type: string = 'url'): SafeUrl {
    if (!value) return '';
    
    // Handle different types of unsafe URLs
    switch(type) {
      case 'resource':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      default:
        return this.sanitizer.bypassSecurityTrustUrl(value);
    }
  }
}
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';
import { SafeResourceUrl } from '@angular/platform-browser';

describe('SafePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SafePipe ],
      imports: [ BrowserModule ]
    });
  });

  it('create an instance', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });

  it('should sanitize and return a safe resource url', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    expect(typeof pipe.transform('http://192.168.1.2:80/')).toBe('object');
  })
});

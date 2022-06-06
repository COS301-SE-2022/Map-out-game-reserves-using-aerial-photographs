import { TestBed } from '@angular/core/testing';

import { VideoSplitterService } from './video-splitter.service';

describe('VideoSplitterService', () => {
  let service: VideoSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

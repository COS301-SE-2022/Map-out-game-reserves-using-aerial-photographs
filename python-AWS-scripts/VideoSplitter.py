import cv2
import numpy as np
import os
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
from moviepy.editor import *
import math

clipLength = 30
fileName = "./DJI_0049.MOV"

# Replace the filename below.
video_file = VideoFileClip(fileName)
num_subclips = math.trunc((video_file.duration/clipLength))

starttime = 0
endtime = clipLength
clip_list = []
clipIndex = 0
currentFrame = 0

print("Splitting video into subclips...")
for clipNum in range(0,num_subclips):
    clip = ffmpeg_extract_subclip(fileName,starttime,endtime,targetname='.\Subclips\\SubClip'+ str(clipIndex) + '.mov')
    #clip.write_videofile(os.path.join('.\Frames\\SubClip',(str(clipIndex) + '.mp4')))
    clipIndex += 1
    starttime += clipLength  
    endtime += clipLength

    # Playing video from file:

print('Splitting frames...')
for filename in os.listdir('.\Subclips'):
    print(filename)
    cap = cv2.VideoCapture('.\Subclips\\'+filename)

    busy = True
    while(busy):
        # Capture frame-by-frame
        ret, frame = cap.read()
        # Saves image of the current frame in jpg file
        name = os.path.join('D:\\Documents\\University of Pretoria\\COS301\\Capstone Project\\ImageStitching\\OpenCV\\SmallFrames',(str(currentFrame) + '.png')) 
        print ('Creating...' + name)
        
        if frame is not None:
            cv2.imwrite(name, frame)
            # To stop duplicate images
            currentFrame += 1
        else:
            print('Cannot make frame...skipping')
            busy = False
            continue

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()